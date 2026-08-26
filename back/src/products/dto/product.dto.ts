import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Xiaomi Xs 3456',
    description: 'Nombre del producto',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'Celular Xiaomi Xs, 125megaPixels, 128Mb',
    description: 'Descripción del producto',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    example: 1200.5,
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
    example: '842fad02-d729-41a5-a2f0-607d542eddca',
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
