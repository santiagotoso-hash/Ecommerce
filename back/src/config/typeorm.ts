import { registerAs } from '@nestjs/config';
import { environment } from './environment';

const config = {
  type: 'postgres',
  database: environment.DB_NAME,
  host: environment.DB_HOST,
  port: Number(environment.DB_PORT),
  username: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,

  // entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  dropSchema: false,
};

export const typeOrmConfig = registerAs('typeorm', () => config);
