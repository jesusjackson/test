import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  async findAll(
    @Query('country') country?: string,
    @Query('description') description?: string,
  ): Promise<Order[]> {
    return this.orderService.getOrders({ country, description });
  }
}
