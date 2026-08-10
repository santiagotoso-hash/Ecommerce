import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from '../../category/entities/category.entity';
import { OrderDetails } from '../../order/entities/orderDetails.entity';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 50,
    unique: true,
  })
  name!: string;

  @Column('text')
  description!: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column()
  stock!: number;

  @Column({
    default:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D.jpeg',
  })
  imgUrl!: string;

  // RELACION CON CATEGORIAS N:1
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({
    name: 'category_id',
  })
  category!: Category;

  // RELACION CON ORDERDETAIL N:N
  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails!: OrderDetails[];
}
