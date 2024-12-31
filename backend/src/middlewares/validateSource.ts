import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { sendErrorResponse } from "@shared/utils/sendResponse";

type RequestSource = "body" | "query" | "params" | "headers";

export const validateSource = (schema: ObjectSchema, source: RequestSource) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!source) {
      sendErrorResponse(res, 400, "SOURCE_IS_REQUIRED");
      return;
    }
    if (!schema) {
      sendErrorResponse(res, 400, "SCHEMA_IS_REQUIRED");
      return;
    }

    const { error } = schema.validate(req[source], { abortEarly: false });

    if (error) {
      const validationErrors = error.details.map((error: any) => error.message);
      sendErrorResponse(res, 400, validationErrors);
      return;
    }

    next();
  };
};
