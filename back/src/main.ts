import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Proyecto Integrador M4 - Back - Ecommerce')
    .setDescription('Desarrollado por Santiago Toso')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  const PORT = Number(environment.PORT);
  const HOST = environment.DB_HOST || 'localhost';

  await app.listen(PORT, HOST);

  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Swagger: http://${HOST}:${PORT}/api`);
}

bootstrap();
