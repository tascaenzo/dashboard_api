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

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.register(require('fastify-multipart'));

  app.enableCors({
    //origin: ['http://localhost:8080', 'http://192.168.1.70:8080'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
  });

  await app.listen(PORT, BIND_ADDRESS);
}
bootstrap();
