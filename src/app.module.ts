import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MysqlModule } from './database/config.module';
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.API_KEY;

@Module({
  imports: [
    MysqlModule
  ],
  providers: [
  ],
})
export class AppModule {}
