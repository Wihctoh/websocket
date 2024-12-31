import express, { Request, Response } from "express";

import { sendErrorResponse, sendResponse } from "@shared/utils/sendResponse";
import { validateSource } from "@middlewares/validateSource";
import { messageValidationScheme } from "@modules/messages/validations/message.validation";

import { getAllMessages, createMessage } from "@modules/messages/services/messages.service";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const messages = await getAllMessages();
    sendResponse(res, 200, messages);
  } catch (error) {
    sendErrorResponse(res, 400, error);
  }
});

router.post("/", validateSource(messageValidationScheme, "body"), async (req: Request, res: Response) => {
  try {
    const { name, message } = req.body;
    const newMessage = await createMessage(name, message);

    sendResponse(res, 200, newMessage);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
});

export default router;
