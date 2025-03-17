import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { Order } from './order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // For simplicity; in production use a robust database.
      database: 'backend',
      username: 'root',
      password: 'root',
      entities: [Order],
      synchronize: true, // In production, consider using migrations.
      logging: true,
    }),
    OrderModule,
  ],
})
export class AppModule {}
