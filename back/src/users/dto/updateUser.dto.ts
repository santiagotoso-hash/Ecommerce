import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Role } from '../../common/roles.enum';

export class UpdateRoleDto {
  @ApiProperty({
    example: 'Role.Admin',
    enum: Role,
    description: 'Nuevo rol de usuario',
  })
  @IsEnum(Role, {
    message: 'El rol debe ser USER o ADMIN',
  })
  role!: Role;
}
