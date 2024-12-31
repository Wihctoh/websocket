import dotenv from "dotenv";
dotenv.config();
import { server } from "@configs/app";
import { logger } from "@shared/utils/logger";
import { databaseConnection } from "@configs/database";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await databaseConnection();

    server.listen(PORT, () => {
      logger.info(`SERVER_IS_RUNNING_ON:${PORT} MODE:${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error("FAILED_TO_START_SERVER:", error);
    process.exit(1);
  }
}

bootstrap();
