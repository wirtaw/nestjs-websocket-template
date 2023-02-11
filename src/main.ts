import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import secureSession from '@fastify/secure-session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { logger: ['debug'] },
  );

  const secret = app.get(ConfigService).get<string>('SESSION_SECRET') || '';
  const salt = app.get(ConfigService).get<string>('SESSION_SALT') || '';

  if (secret && salt && salt.length >= 16) {
    await app.register(secureSession, {
      secret,
      salt,
    });
  }

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  const port = app.get(ConfigService).get<number>('PORT') || 3001;
  const host = app.get(ConfigService).get<string>('HOST') || '0.0.0.0';
  await app.listen(port, host);
}
bootstrap();
