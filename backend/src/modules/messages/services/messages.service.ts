import { Message, MessageType } from "@modules/messages/models/messages.model";
import { ObjectId } from "mongodb";

import { wss } from "@src/configs/app";
import { logger } from "@src/shared/utils/logger";

let messageBuffer: MessageType[] = [];
let timeoutId: any = null;

export const broadcastMessages = (wss: any, messages: MessageType[]) => {
  wss.clients.forEach((client: any) => {
    if (client.readyState === WebSocket.OPEN) {
      messages.forEach((message) => {
        client.send(JSON.stringify(message));
      });
    }
  });
};

export const flushMessages = async (wss: any) => {
  if (messageBuffer.length === 0) return;
  const messagesToInsert = [...messageBuffer];

  try {
    messageBuffer = [];
    clearTimeout(timeoutId);
    timeoutId = null;

    const result = await Message.insertMany(messagesToInsert);

    broadcastMessages(wss, messagesToInsert);

    return result;
  } catch (error) {
    logger.error("ERROR_INSERTING_MESSAGES:", error);

    messageBuffer.unshift(...messagesToInsert);
    throw error;
  }
};

export const getAllMessages = async (): Promise<MessageType[]> => {
  const messages = await Message.find();
  if (!messages.length) throw new Error("NO_HAVE_MESSAGES");

  return messages;
};

export const createMessage = async (name: string, message: string) => {
  messageBuffer.push({ name, message, createdAt: new Date(), updatedAt: new Date(), _id: new ObjectId() });

  if (messageBuffer.length >= 10) {
    await flushMessages(wss);
  } else if (!timeoutId) {
    timeoutId = setTimeout(() => {
      flushMessages(wss);
    }, 1000);
  }

  return { status: "MESSAGE_ADD_TO_BUFFER" };
};

async function shutdown() {
  if (messageBuffer.length > 0) {
    try {
      await flushMessages(wss);
    } catch (error) {
      logger.error("ERROR_FLASHING_MESSAGES_DURING_SHUTDOWN:", error);
    }
  }

  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
