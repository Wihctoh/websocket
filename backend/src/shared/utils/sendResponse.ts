import { Response } from "express";

import { logger } from "@shared/utils/logger";

export const sendResponse = (res: Response, status: number, data: any, message = "SUCCESS") => {
  const responseMessage = {
    success: true,
    message,
    data,
  };

  if (process.env.NODE_ENV === "DEVELOPMENT") logger.info(responseMessage);
  return res.status(status).send(responseMessage);
};

export const sendErrorResponse = (res: Response, status: number, error: any, message = "ERROR") => {
  if (error.response) {
    const responseMessage = {
      responseStatus: error.response.status,
      response: {
        success: false,
        message: error.response.data.description || message,
        error: {
          message: error.response.data,
          status: error.response.status,
        },
      },
    };

    logger.error(responseMessage);
    return res.status(responseMessage.responseStatus).send(responseMessage.response);
  }

  const responseMessage = {
    success: false,
    message: message || error.message,
    error: {
      message: error.message || error,
      stack: error.stack,
    },
  };

  logger.error(responseMessage);
  return res.status(status).send(responseMessage);
};
