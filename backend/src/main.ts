import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from '../data-source';
import { createDatabaseIfNotExists } from './migrate'; // optional helper

async function bootstrap() {
  try {
    await createDatabaseIfNotExists();
    // Initialize the DataSource (this connects to the database)
    await AppDataSource.initialize();

    // Run pending migrations
    await AppDataSource.runMigrations();
    console.log('Migrations executed successfully.');
  } catch (error) {
    console.error('Error during migration:', error);
    // Depending on your needs, you might exit the process here
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enables CORS for all origins and methods
  await app.listen(3000);
}

void bootstrap().then(() => {
  console.log('The bootstrap is running on port 3000');
});
