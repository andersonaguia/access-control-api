import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [
    __dirname + '/../../**/**/*.entity{.ts,.js}',
    'dist/**/**/*.entity.js',
  ],
  migrations: [
    __dirname + './migrations/*{.ts,.js}',
    'dist/core/database/migrations/*{.ts,.js}',
  ],
  migrationsRun: false,
  synchronize: false,
  migrationsTableName: 'migrations_history',
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;