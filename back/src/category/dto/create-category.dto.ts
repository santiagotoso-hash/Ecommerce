import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Eletrônicos',
    description: 'Nome da categoria',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
