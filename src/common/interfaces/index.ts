export interface EnvProps {
    port: number;
    socketPort: number;
    database: {
      dialect: string;
      host: string;
      port: number;
      user: string;
      password: string;
      name: string;
    };
  }
  