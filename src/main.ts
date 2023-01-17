import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance }),
  });
  const configService = app.get(ConfigService); // 取得 ConfigService
  const PORT = configService.get('PORT');
  app.setGlobalPrefix('api/v1');

  await app.listen(PORT);
}
bootstrap();
