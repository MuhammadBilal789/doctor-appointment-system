import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  name: string;
  user: string;
  password: string;
}

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    host: process.env.DATABASE_HOST || 'localhost:27017',
    name: process.env.DATABASE_NAME || 'nest',
    user: process.env.DATABASE_USER || '',
    password: process.env.DATABASE_PASSWORD || '',
  }),
);