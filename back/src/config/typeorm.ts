import { registerAs } from '@nestjs/config';
import { environment } from './environment';

const config = {
  type: 'postgres',
  database: environment.DB_NAME,
  // host: 'postgresdb',
  host: environment.DB_HOST,

  port: Number(environment.DB_PORT),
  username: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,

  entities: ['dist/**/*.entity.ts'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  dropSchema: false,
};

export const typeOrmConfig = registerAs('typeorm', () => config);

import { DataSource, DataSourceOptions } from 'typeorm';
export const connectionSource = new DataSource(config as DataSourceOptions);
