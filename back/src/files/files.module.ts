import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileUploadRepository } from './files.repository';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), ProductsModule],
  controllers: [FilesController],
  providers: [FilesService, FileUploadRepository, CloudinaryConfig],
})
export class FilesModule {}
