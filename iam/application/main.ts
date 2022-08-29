import * as https from 'https';
import * as http from 'http';

import { certificate } from '@ssl';
import { configService } from '@config';

import { createListener } from './http';
import { dataSource } from './http/config';
import { AddressInfo } from 'net';

async function bootstrap() {
  let server: http.Server;

  const listener = createListener();

  const protocol = configService.get<string>('APP_PROTOCOL');

  if (protocol === 'https') {
    server = https.createServer({ ...certificate }, listener);
  } else {
    server = http.createServer(listener);
  }

  const port = Number(configService.get<string>('APP_PORT'));
  const host = configService.get<string>('APP_HOST');

  await dataSource.initialize();

  server.listen(port, host, () => {
    const { address, port } = server.address() as AddressInfo;

    console.log(`[SERVER STARTING] server listens to ${protocol}://${address}:${port}`);
  });
}

bootstrap();
