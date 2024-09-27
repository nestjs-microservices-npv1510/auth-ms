import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import * as config from './config/envs';
console.log(config.envs.NATS_SERVERS);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: config.envs.NATS_SERVERS,
      },
    },
  );

  await app.listen();
}
bootstrap();
