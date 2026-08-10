import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID, ArrayMinSize } from 'class-validator';

import { Products } from '../../products/entities/product.entity';

export class CreateOrderDto {
  @ApiProperty({
    example: '9b7b8d7e-3c4a-4b6d-9f1e-123456789abc',
    description: 'UUID del usuario',
  })
  @IsNotEmpty({
    message: 'UserId es requerido',
  })
  @IsUUID(4, {
    message: 'Id de user debe ser un UUID v4',
  })
  userId!: string;

  @ApiProperty({
    example: [
      {
        id: 'uuid-producto',
      },
    ],
    description: 'Array de productos',
  })
  @IsArray({
    message: 'Debe ser un array de productos',
  })
  @ArrayMinSize(1, {
    message: 'Debe contener al menos 1 producto',
  })
  products!: Partial<Products>[];
}
