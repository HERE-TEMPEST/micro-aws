import { readFileSync } from 'fs';
import { resolve } from 'path';

import { configService } from '@config';

export const certificate = {
  cert: readFileSync(resolve(process.cwd(), 'ssl', 'cert.pem'), 'utf8'),
  key: readFileSync(resolve(process.cwd(), 'ssl', 'key.pem'), 'utf8'),
  passphrase: configService.get<string>('APP_SECRET', undefined),
};
