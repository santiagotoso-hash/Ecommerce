import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(0)
  stock!: number;

  @IsUUID()
  categoryId!: string;

  imgUrl?: string;
}
