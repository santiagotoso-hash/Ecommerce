import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsUUID,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderProductDto {
  @ApiProperty({
    example: 'uuid-producto',
    description: 'UUID del producto',
  })
  @IsNotEmpty({
    message: 'El id del producto es requerido',
  })
  @IsUUID(4, {
    message: 'El id del producto debe ser un UUID v4',
  })
  id!: string;
}

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
    type: [OrderProductDto],
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
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products!: OrderProductDto[];
}
