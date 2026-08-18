import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Coca Cola',
    description: 'Nombre del producto',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'Bebida gaseosa de 500ml',
    description: 'Descripción del producto',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    example: 12.5,
    description: 'Precio del producto',
  })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    example: 20,
    description: 'Stock disponible',
  })
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la categoría',
  })
  @IsUUID()
  categoryId!: string;

  @ApiProperty({
    example: 'https://imagen.com/producto.jpg',
    description: 'URL de la imagen',
    required: false,
  })
  imgUrl?: string;
}
