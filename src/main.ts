import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // 取得 ConfigService
  const PORT = configService.get('PORT');
  app.setGlobalPrefix('api/v1');
  console.log('port', PORT);

  await app.listen(PORT);
}
bootstrap();
