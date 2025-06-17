import dotenv from 'dotenv';
dotenv.config();

export const env = {
  APP_NAME: String(process.env.APP_NAME ?? 'BACKEND APP'),
  APP_URL: String(process.env.APP_URL ?? 'http://localhost:4000'),
  APP_PORT: Number(process.env.APP_PORT ?? 3000),
  DB_HOST: String(process.env.DB_HOST ?? 'localhost'),
  DB_PORT: Number(process.env.DB_PORT ?? 5432),
  DB_USER: String(process.env.DB_USER ?? 'postgres'),
  DB_PASSWORD: String(process.env.DB_PASSWORD ?? 'root'),
  DB_NAME: String(process.env.DB_NAME ?? 'db_app'),
  SECRET_KEY: String(process.env.SECRET_KEY ?? 'secret-app'),
  JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN ?? '1d'),
};
