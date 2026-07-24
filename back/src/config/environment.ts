import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const environment = {
  PORT: Number(process.env.PORT) || 3000,

  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || '',
  DB_USERNAME: process.env.DB_USERNAME || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
};
