import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { join } from 'path';

import { configService } from '@config';

config();

export const dataSource = new DataSource({
  logging: true,
  migrations: ['migrations/*.ts'],
  entities: ['./**/entities/**'],
  synchronize: true,
  type: 'postgres',
  url: `postgresql://${configService.get('POSTGRES_USER')}:${configService.get(
    'POSTGRES_PASSWORD',
    // )}@pg_database/${configService.get('POSTGRES_IAM_DATABASE')}`,
  )}@localhost/${configService.get('POSTGRES_IAM_DATABASE')}`,
});

// export const dataSource = {
//   getRepository() {
//     return;
//   },
//   async initialize() {
//     return;
//   },
// };
