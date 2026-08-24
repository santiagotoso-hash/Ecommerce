import {
  ApiHideProperty,
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../../decorators/matchPassword.decorator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Debe ser un string de entre 3 y 50 caracteres',
    example: 'Test User 01',
  })
  @IsNotEmpty({ message: 'Nombre es requerido' })
  @IsString({ message: 'Nombre debe ser texto' })
  @MinLength(3, { message: 'Mínimo de 3 caracteres' })
  @MaxLength(80, { message: 'Máximo de 80 caracteres' })
  name!: string;

  @ApiProperty({
    description: 'Debe ser un email válido',
    example: 'test@test.com',
  })
  @IsNotEmpty({ message: 'Email es requerido' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  email!: string;

  @ApiProperty({
    description:
      'Debe contener entre 8 y 15 caracteres, debe contener al menos una minúscula, una mayúscula, un número y un carácter especial.',
    example: 'AAbb123@',
  })
  @IsNotEmpty({ message: 'Password es requerido' })
  @IsString({ message: 'Paswword debe ser texto' })
  @MinLength(8, { message: 'Mínimo de 8 caracteres' })
  @MaxLength(15, { message: 'Máximo de 15 caracteres' })
  @IsStrongPassword({})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*^]).+$/, {
    message:
      'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial (!@#$%&*^).',
  })
  password!: string;

  @ApiProperty({
    description: 'Debe ser igual al password',
    example: 'AAbb123@',
  })
  @IsNotEmpty({ message: 'Password es requerido' })
  @Validate(MatchPassword, ['password'])
  confirmPassword!: string;

  @ApiProperty({
    description: 'Debe contener entre 3 y 80 caracteres',
    example: 'Calle Falsa, 123',
  })
  @IsString({ message: 'Paswword debe ser texto' })
  @MinLength(3, { message: 'Mínimo de 3 caracteres' })
  @MaxLength(80, { message: 'Máximo de 80 caracteres' })
  address!: string;

  @ApiProperty({
    description: 'Debe ser un número',
    example: '12345678',
  })
  @IsNotEmpty({ message: 'Telefono es requerido' })
  @IsNumber({}, { message: 'Telefono debe ser número' })
  phone!: number;

  @ApiProperty({
    description: 'Debe contener entre 5 y 20 caracteres',
    example: 'Test Country',
  })
  @IsString({ message: 'Paswword debe ser texto' })
  @MinLength(5)
  @MaxLength(20)
  country!: string;

  @ApiProperty({
    description: 'Debe contener entre 5 y 20 caracteres',
    example: 'Test City',
  })
  @IsString({ message: 'Paswword debe ser texto' })
  @MinLength(5)
  @MaxLength(20)
  city!: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;

  // @ApiHideProperty()
  // @IsEmpty()
  // isTester?: boolean;
}

export class UpdateUserDTO extends PartialType(
  OmitType(CreateUserDTO, ['email'] as const),
) {}

export class LoginUserDto extends PickType(CreateUserDTO, [
  'email',
  'password',
]) {}
