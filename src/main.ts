import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );

  /* Swagger OpenApi Documentation */
  const options = new DocumentBuilder().setTitle('Dashboard API').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /* automatically validates the DTO in the body request */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
