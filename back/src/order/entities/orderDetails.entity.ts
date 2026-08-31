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
import { Products } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDER_DETAIL',
})
export class OrderDetails {
  @ApiProperty({
    description: 'UUIDv4 generado por DB',
    example: '8f4c3c3d-2e5a-4e55-9b7f-8a9b8c7d6e5f',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Precio decimal del detalle',
    example: 150.5,
  })
  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({ default: false })
  freeShipping!: boolean;

  // RELACIÓN CON ORDERS 1:1
  @ApiProperty({
    description: 'Orden asociada',
    type: () => Orders,
  })
  @OneToOne(() => Orders, (order) => order.orderDetail)
  @JoinColumn({
    name: 'order_id',
  })
  orders!: Orders;

  // RELACIÓN CON PRODUCTS N:N
  @ApiProperty({
    description: 'Productos incluidos en el detalle',
    type: () => [Products],
  })
  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'order_detail_products',
  })
  products!: Products[];
}
