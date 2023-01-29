import { WinstonModule, utilities } from 'nest-winston';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Log } from 'src/enum/config';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

function createDailyRotateTransports(level: string, filename: string) {
  return new winston.transports.DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransports = new winston.transports.Console({
          level: configService.get(Log.LOG_LEVEL),
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });

        return {
          transports: [
            consoleTransports,
            ...(configService.get(Log.LOG_ON)
              ? [
                  // NOTE: use function to prevent winston from creating log file when new
                  createDailyRotateTransports('info', 'application'),
                  createDailyRotateTransports('warning', 'warning'),
                ]
              : []),
          ],
        };
      },
    }),
  ],
})
export class LogsModule {}
