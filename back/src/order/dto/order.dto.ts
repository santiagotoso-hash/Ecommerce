import { IsArray, IsNotEmpty, IsUUID, ArrayMinSize } from 'class-validator';
import { Products } from '../../products/entities/product.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'UserId es requerido' })
  @IsUUID(4, { message: 'Id de user debe ser un UUID v4' })
  userId!: string;

  @IsArray({ message: 'Debe ser un array de productos' })
  @ArrayMinSize(1, { message: 'Debe contener al menos 1 producto' })
  products!: Partial<Products[]>;
}
