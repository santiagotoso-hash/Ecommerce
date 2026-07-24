import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Orders } from 'src/order/entities/orders.entity';

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
    length: 20,
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  phone!: string;

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

  // RELACION CON ORDER 1 : N
  @OneToMany(() => Orders, (order) => order.users)
  orders!: Orders[];
}

//id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
//
//name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
//
//email: debe ser una cadena de texto de máximo 50 caracteres, único y no puede ser nulo.
//
//password: debe ser una cadena de texto de máximo 20 caracteres y no puede ser nulo.
//
//phone: debe ser un número entero.
//
//country: debe ser una cadena de texto de máximo 50 caracteres.
//
//address: debe ser un texto.
//
//city: debe ser una cadena de texto de máximo 50 caracteres.
//
//orders_id: Relación 1:N con orders.
