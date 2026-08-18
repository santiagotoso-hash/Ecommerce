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
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
  @ApiProperty({
    description: 'Id de tipo UUIDv4',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Debe contener máximo de 50 caracteres',
    example: 'Producto 01',
  })
  @Column({
    length: 50,
    unique: true,
  })
  name!: string;

  @ApiProperty({
    description: 'Debe tener la descripcion del producto',
    example: 'producto description',
  })
  @Column('text')
  description!: string;

  @ApiProperty({
    description: 'Precio con10 dígitos en total y 2 decimales',
    example: '10,50',
  })
  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price!: number;

  @ApiProperty({
    description: 'Cantidad en stock',
    example: '10',
  })
  @Column()
  stock!: number;

  @ApiProperty({
    description: 'url de la imagen',
    example: 'https://images.unsplash.com/photo-1526170375885.jpeg',
  })
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
