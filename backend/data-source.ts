import { DataSource } from 'typeorm';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'backend',
  // If you prefer relative paths for your entities/migrations:
  // Note: Adjust the path if needed (e.g., "../**/*.entity.ts" depending on your structure).
  entities: [path.join(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'src/migration/**/*.ts')],
  synchronize: false, // Typically "false" when using migrations
  logging: true,
});
