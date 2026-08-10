import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('files')
export class File {
  @ApiProperty({
    description: 'UUID del archivo',
    example: '8f4c3c3d-2e5a-4e55-9b7f-8a9b8c7d6e5f',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'image-123456.jpg',
  })
  @Column()
  filename!: string;

  @ApiProperty({
    example: 'foto-perfil.jpg',
  })
  @Column()
  originalName!: string;

  @ApiProperty({
    example: 'image/jpeg',
  })
  @Column()
  mimetype!: string;

  @ApiProperty({
    example: '/uploads/foto-perfil.jpg',
  })
  @Column()
  path!: string;

  @ApiProperty({
    example: 245678,
  })
  @Column()
  size!: number;

  @ApiProperty({
    example: true,
  })
  @Column({ default: true })
  active!: boolean;
}
