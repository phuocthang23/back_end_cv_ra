import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Connection } from 'typeorm';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class MysqlModule implements OnModuleInit {
  constructor(private connection: Connection) {}

  async onModuleInit() {
    try {
      await this.connection.query('SELECT 1');
      console.log('Kết nối cơ sở dữ liệu thành công!');
    } catch (error) {
      console.error('Lỗi kết nối cơ sở dữ liệu:', error);
    }
  }
}
