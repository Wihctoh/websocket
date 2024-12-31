import mongoose from "mongoose";

import { logger } from "@src/shared/utils/logger";

export async function databaseConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/messages");
    logger.info("SUCCESSFULLY_CONNECTED_TO_DATABASE");

    mongoose.connection.on("error", (error) => {
      logger.error("DATABASE_CONNECTION_ERROR:", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("DATABASE_DISCONNECTED");
    });

    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        logger.info("DATABASE_CONNECTION_CLOSED");
        process.exit(0);
      } catch (error) {
        logger.error("ERROR_DURING_MONGODB_DISCONNECT:", error);
        process.exit(1);
      }
    });
  } catch (error) {
    logger.error("DATABASE_CONNECTION_ERROR:", error);
    process.exit(1);
  }
}
