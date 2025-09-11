import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class AppLogger {
  private logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level.toUpperCase()} ${message}`;
        }),
      ),
      transports: [
        new transports.Console(),
        new DailyRotateFile({
          filename: 'logs/app-%DATE%.log', // e.g., logs/app-2025-08-26.log
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d', // keep 14 days
        }),
      ],
    });
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }
}
