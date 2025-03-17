import { AppDataSource } from '../data-source';
import * as mysql from 'mysql2/promise';
// All the credentials should be moved to a .env file for security
export async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`backend\`;`);
  await connection.end();
}
(async () => {
  try {
    await createDatabaseIfNotExists();
    // Initialize the data source (this establishes the DB connection)
    await AppDataSource.initialize();

    // Run all pending migrations
    await AppDataSource.runMigrations();

    console.log('Migrations executed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    // Properly release the connection
    await AppDataSource.destroy();
  }
})();
