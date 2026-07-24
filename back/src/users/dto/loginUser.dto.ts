import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LoginUserDto {
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
