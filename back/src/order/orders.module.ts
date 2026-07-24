import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { OrderDetails } from 'src/order/entities/orderDetails.entity';
import { OrdersRepository } from './orders.repository';
import { ProductRepository } from '../products/products.repository';
import { Users } from '../users/entities/user.entity';
import { Products } from '../products/entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products, Category]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, ProductRepository],
})
export class OrderModule {}
