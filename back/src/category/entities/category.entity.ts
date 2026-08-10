import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from '../../products/entities/product.entity';

@Entity({
  name: 'CATEGORIES',
})
export class Category {
  @ApiProperty({
    description: 'UUID de la categoría',
    example: '8f4c3c3d-2e5a-4e55-9b7f-8a9b8c7d6e5f',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Bebidas',
  })
  @Column({
    unique: true,
    length: 50,
  })
  name!: string;

  @ApiProperty({
    description: 'Productos asociados a la categoría',
    type: () => [Products],
  })
  @OneToMany(() => Products, (product) => product.category)
  products!: Products[];
}
