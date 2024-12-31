import express, { Request, Response, NextFunction } from "express";
import http from "http";
import WebSocket from "ws";
import cors from "cors";
import helmet from "helmet";

import { sendErrorResponse } from "@shared/utils/sendResponse";

import messagesRouter from "@src/modules/messages/controllers/messages.controller";

export const app = express();
export const server = http.createServer(app);
export const wss = new WebSocket.Server({ server });

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/messages", messagesRouter);

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  sendErrorResponse(res, 500, error);
});
