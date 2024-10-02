import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import * as config from './config/envs';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RpcCatchErrorInterceptor } from './common/interceptors/rpcCatchError.interceptor';
// console.log(config.envs.NATS_SERVERS);

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

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new RpcCatchErrorInterceptor(),
  );

  await app.listen();
}
bootstrap();
