import { EnvProps } from './interfaces';

export default (): EnvProps => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  socketPort: parseInt(process.env.SOCKET_PORT, 10) || 8001,
  database: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  }
});
