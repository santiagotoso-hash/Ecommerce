import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Users } from 'src/users/entities/user.entity';
import { OrderDetails } from './orderDetails.entity';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'date',
  })
  date!: Date;

  //RELACION CON ORDER DETAIL 1:1

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
  })
  users!: Users;

  //RELACION CON ORDERDETAILS 1:1
  @OneToOne(() => OrderDetails, (ordersDetail) => ordersDetail.orders)
  orderDetail!: OrderDetails;
}
