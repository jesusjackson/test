import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.entity';

// Mock OrderService
const mockOrderService = {
  createOrder: jest.fn(),
  getOrders: jest.fn(),
};

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an order and return the result', async () => {
      const createOrderDto: CreateOrderDto = {
        orderNumber: 'ORD-001',
        paymentDescription: 'Sample order payment',
        streetAddress: '123 Main St',
        town: 'Anytown',
        country: 'USA',
        amount: 150.5,
        currency: 'USD',
        paymentDueDate: new Date('2025-04-01T00:00:00Z'),
      };

      const expectedOrder = {
        id: 'uuid-generated-id',
        orderNumber: 'ORD-001',
        paymentDescription: 'Sample order payment',
        streetAddress: '123 Main St',
        town: 'Anytown',
        country: 'USA',
        amount: 150.5,
        currency: 'USD',
        paymentDueDate: new Date('2025-04-01T00:00:00Z'),
        generateId: jest.fn(),
      } as Order;

      mockOrderService.createOrder.mockResolvedValue(expectedOrder);

      const result = await controller.create(createOrderDto);

      expect(service.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(expectedOrder);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders with provided filters', async () => {
      const query = { country: 'USA', description: 'Laptop' };

      const expectedOrders: Order[] = [
        {
          id: 'uuid-002',
          orderNumber: 'ORD-002',
          paymentDescription: 'Laptop X payment',
          streetAddress: '456 Tech St',
          town: 'Techtown',
          country: 'USA',
          amount: 1200,
          currency: 'USD',
          paymentDueDate: new Date('2025-05-01T00:00:00Z'),
          generateId: jest.fn(),
        },
      ];

      mockOrderService.getOrders.mockResolvedValue(expectedOrders);

      const result = await controller.findAll(query.country, query.description);

      expect(service.getOrders).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedOrders);
    });

    it('should return all orders if no filter provided', async () => {
      const expectedOrders: Order[] = [
        {
          id: 'uuid-002',
          orderNumber: 'ORD-002',
          paymentDescription: 'Laptop X payment',
          streetAddress: '456 Tech St',
          town: 'Techtown',
          country: 'USA',
          amount: 1200,
          currency: 'USD',
          paymentDueDate: new Date('2025-05-01T00:00:00Z'),
          generateId: jest.fn(),
        },
        {
          id: 'uuid-003',
          orderNumber: 'ORD-003',
          paymentDescription: 'Phone Y payment',
          streetAddress: '789 Mobile Ave',
          town: 'Mobilia',
          country: 'Canada',
          amount: 800,
          currency: 'CAD',
          paymentDueDate: new Date('2025-06-01T00:00:00Z'),
          generateId: jest.fn(),
        },
      ];

      mockOrderService.getOrders.mockResolvedValue(expectedOrders);

      const result = await controller.findAll();

      expect(service.getOrders).toHaveBeenCalledWith({
        country: undefined,
        description: undefined,
      });
      expect(result).toEqual(expectedOrders);
    });
  });
});
