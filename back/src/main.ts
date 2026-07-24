import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const PORT = Number(environment.PORT);
  const HOST = environment.DB_HOST;

  await app.listen(PORT);
  console.log(`Server is running on http://${HOST}:${PORT}`);
}
bootstrap();
