import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/**
 * Main bootstrap function
 * The port is hardcoded as it's mapped to real one from .env by Docker
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8181);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
