import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import PostEntity from './src/post/entity/post.entity';
import { CreatePost1674032785215 } from './migrations/1674032785215-CreatePost';

config();

const configService = new ConfigService();
// NOTE: need to use npm instead of pnpm to use $npm_config_name
export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [PostEntity],
  migrations: [CreatePost1674032785215],
});
