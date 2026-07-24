import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Products } from 'src/products/entities/product.entity';

@Entity({
  name: 'CATEGORIES',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
    length: 50,
  })
  name!: string;

  // RELACION CON PRODUCTOS 1:N
  @OneToMany(() => Products, (product) => product.category)
  products!: Products[];
}
