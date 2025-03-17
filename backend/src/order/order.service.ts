import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Check for duplicate order number.
    const existing = await this.orderRepository.findOne({
      where: { orderNumber: createOrderDto.orderNumber },
    });
    if (existing) {
      throw new ConflictException('Order number already exists');
    }
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async getOrders(filter: {
    country?: string;
    description?: string;
  }): Promise<Order[]> {
    const qb = this.orderRepository.createQueryBuilder('order');

    if (filter.country) {
      qb.andWhere('order.country LIKE :country', {
        country: `%${filter.country}%`,
      });
    }
    if (filter.description) {
      qb.andWhere('order.paymentDescription LIKE :desc', {
        desc: `%${filter.description}%`,
      });
    }

    // Orders from Estonia first, then all orders sorted by paymentDueDate ascending.
    qb.orderBy(
      `CASE WHEN order.country = 'Estonia' THEN 0 ELSE 1 END`,
      'ASC',
    ).addOrderBy('order.paymentDueDate', 'ASC');

    return qb.getMany();
  }
}
