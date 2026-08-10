import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Orders } from '../../order/entities/orders.entity';

@Entity({
  name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 50,
    nullable: false,
  })
  name!: string;

  @Column({
    length: 50,
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({
    length: 60,
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  phone!: number;

  @Column({
    length: 50,
    nullable: true,
  })
  country!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address!: string;

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
