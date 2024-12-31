import joi from "joi";

export const messageValidationScheme = joi.object({
  name: joi.string().required(),
  message: joi.string().required(),
});
