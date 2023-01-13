import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envFilePath],
      load: [],
      validationSchema: Joi.object({
        DB: Joi.string().ip(),
        DB_HOST: Joi.string().ip(),
        DB_PORT: Joi.number().default(3306),
        DB_USER: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
      }),
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
