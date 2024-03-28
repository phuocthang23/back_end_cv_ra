import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:5174',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT_URL || 8080;
  await app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}
bootstrap();
