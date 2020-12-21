import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PORT, BIND_ADDRESS } from '@/utils/env.json';
//import * as helmet from 'fastify-helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );

  /* automatically validates the DTO in the body request */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, BIND_ADDRESS);
}
bootstrap();
