import { DataSource } from 'typeorm';
import { env } from '@config/env';
import { TypeOrmLogger } from '@utils/logger/typorm-logger';
import { User } from '@entities/user.entity';
import { Doctor } from '@entities/doctor.entity';
import { Schedule } from '@entities/schedule.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  entities: [User, Doctor, Schedule],
  migrations: ['src/migrations/**/*.ts'],
  logging: true,
  logger: new TypeOrmLogger(),
});
