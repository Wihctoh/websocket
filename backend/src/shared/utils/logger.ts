import pino from "pino";
import moment from "moment-timezone";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      colorizeObjects: true,
      translateTime: moment().tz("Europe/Moscow").format("DD.MM.YYYY HH:mm:ss"),
    },
  },
});
