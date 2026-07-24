import { OmitType, PartialType } from '@nestjs/swagger';
import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Nombre es requerido' })
  @IsString({ message: 'Nombre debe ser texto' })
  @MinLength(3, { message: 'Mínimo de 3 caracteres' })
  @MaxLength(80, { message: 'Máximo de 3 caracteres' })
  name!: string;

  @IsNotEmpty({ message: 'Email es requerido' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  email!: string;

  @IsNotEmpty({ message: 'Password es requerido' })
  @IsString({ message: 'Nombre debe ser texto' })
  @MinLength(8, { message: 'Mínimo de 8 caracteres' })
  @MaxLength(15, { message: 'Máximo de 15 caracteres' })
  @IsStrongPassword({})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*^]).+$/, {
    message:
      'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial (!@#$%&*^).',
  })
  password!: string;

  @MinLength(3, { message: 'Mínimo de 3 caracteres' })
  @MaxLength(80, { message: 'Máximo de 80 caracteres' })
  address!: string;

  @IsNotEmpty({ message: 'Telefono es requerido' })
  @IsNumber({}, { message: 'Telefono debe ser string' })
  phone!: string;

  @MinLength(5)
  @MaxLength(20)
  country!: string;

  @MinLength(5)
  @MaxLength(20)
  city!: string;
}

export class UpdateUserDTO extends PartialType(
  OmitType(CreateUserDTO, ['email'] as const),
) {}

export class LoginUserDto extends PickType(CreateUserDTO, [
  'email',
  'password',
]) {}
