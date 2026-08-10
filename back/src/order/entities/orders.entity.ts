import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Users } from '../../users/entities/user.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @ApiProperty({
    description: 'ID de tipo UUIDv4 generado por DB',
    example: '8f4c3c3d-2e5a-4e55-9b7f-8a9b8c7d6e5f',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Fecha de la orden',
    example: '2026-08-05',
  })
  @Column({
    type: 'date',
  })
  date!: Date;

  @ApiProperty({
    description: 'Usuario que realizó la orden',
    type: () => Users,
  })
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
  })
  users!: Users;

  @ApiProperty({
    description: 'Detalle asociado a la orden',
    type: () => OrderDetails,
  })
  @OneToOne(() => OrderDetails, (ordersDetail) => ordersDetail.orders)
  orderDetail!: OrderDetails;
}
