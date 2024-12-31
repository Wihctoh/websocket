import { wss } from "@configs/app";
import { Message } from "@modules/messages/models/messages.model";
import { logger } from "@src/shared/utils/logger";

wss.on("connection", async (ws) => {
  try {
    const messages = await Message.find();

    if (messages.length > 0) {
      ws.send(JSON.stringify({ type: "initial", messages }));
    }
  } catch (error) {
    logger.error(error);
  }

  ws.on("message", (message) => {});

  ws.on("close", () => {});
});
