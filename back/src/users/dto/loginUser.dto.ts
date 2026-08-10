import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty({
    example: 'test@test.com',
    description: 'Email del usuario',
  })
  @IsNotEmpty({
    message: 'El email es obligatorio.',
  })
  @IsEmail(
    {},
    {
      message: 'El email no tiene un formato válido.',
    },
  )
  email!: string;

  @ApiProperty({
    example: 'AAbb123@',
    description: 'Contraseña del usuario',
    minLength: 8,
    maxLength: 15,
  })
  @IsNotEmpty({
    message: 'La contraseña es obligatoria.',
  })
  @IsString({
    message: 'La contraseña debe ser una cadena de texto.',
  })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.',
  })
  @MaxLength(15, {
    message: 'La contraseña no puede superar los 15 caracteres.',
  })
  password!: string;
}
