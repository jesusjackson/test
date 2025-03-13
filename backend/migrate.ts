import { AppDataSource } from './data-source';

(async () => {
  try {
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
