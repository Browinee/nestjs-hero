// import { AllExceptionFilter } from './filters/all-exception.filter.ts';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // 取得 ConfigService
  const PORT = configService.get('PORT');
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('api/v1');

  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger();
  // app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  await app.listen(PORT);
}
bootstrap();
