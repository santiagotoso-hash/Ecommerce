import {
  Column,
  Entity,
  OneToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import { Orders } from './orders.entity';
import { Products } from 'src/products/entities/product.entity';

@Entity({
  name: 'ORDER_DETAIL',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price!: number;

  // RELACION CON ORDERS 1:1
  @OneToOne(() => Orders, (Orders) => Orders.orderDetail)
  @JoinColumn({
    name: 'order_id',
  })
  orders!: Orders;

  //RELACION CON PRODUCTS N:N
  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'order_detail_products',
  })
  products!: Products[];
}
