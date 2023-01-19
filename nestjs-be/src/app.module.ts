import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { LogsModule } from './logs/logs.module';
import { PostModule } from './post/post.module';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', envFilePath],
      load: [],
      validationSchema: Joi.object({
        DB: Joi.string().ip(),
        DB_HOST: Joi.string().ip(),
        DB_PORT: Joi.number().default(3306),
        DB_USER: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        LOG_LEVEL: Joi.string(),
        LOG_ON: Joi.bool(),
      }),
    }),
    DatabaseModule,
    UserModule,
    LogsModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger],
})
export class AppModule {}
