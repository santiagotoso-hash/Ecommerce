import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Orders } from '../../order/entities/orders.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Debe ser un string de entre 3 y 50 caracteres',
    example: 'Test User 01',
  })
  @Column({
    length: 50,
    nullable: false,
  })
  name!: string;

  @ApiProperty({
    description: 'Debe ser un email válido',
    example: 'test@test.com',
  })
  @Column({
    length: 50,
    unique: true,
    nullable: false,
  })
  email!: string;

  @ApiProperty({
    description:
      'Debe contener entre 8 y 15 caracteres, debe contener al menos una minúscula, una mayúscula, un número y un carácter especial.',
    example: 'AAbb123@',
  })
  @Column({
    length: 60,
    nullable: false,
  })
  password!: string;

  @ApiProperty({
    description: 'Debe ser un número',
    example: '12345678',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  phone!: number;

  @ApiProperty({
    description: 'Debe contener entre 5 y 20 caracteres',
    example: 'Test Country',
  })
  @Column({
    length: 50,
    nullable: true,
  })
  country!: string;

  @ApiProperty({
    description: 'Debe contener entre 3 y 80 caracteres',
    example: 'Calle Falsa, 123',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  address!: string;

  @ApiProperty({
    description: 'Debe contener entre 5 y 20 caracteres',
    example: 'Test City',
  })
  @Column({
    length: 50,
    nullable: true,
  })
  city!: string;

  @Column({
    default: false,
  })
  isAdmin!: boolean;

  // RELACION CON ORDER 1 : N
  @OneToMany(() => Orders, (order) => order.users)
  orders!: Orders[];
}
