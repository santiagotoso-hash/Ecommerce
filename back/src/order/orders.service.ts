import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getAllOrders() {
    return this.ordersRepository.getAllOrders();
  }
  getOrderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }

  addOrder(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.addOrder(createOrderDto);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a ${id} order`;
  }

  // update(id: string, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a ${id} order`;
  // }

  remove(id: string) {
    return `This action removes a ${id} order`;
  }
}
