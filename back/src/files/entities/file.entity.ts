import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  filename!: string;

  @Column()
  originalName!: string;

  @Column()
  mimetype!: string;

  @Column()
  path!: string;

  @Column()
  size!: number;

  @Column({ default: true })
  active!: boolean;
}
