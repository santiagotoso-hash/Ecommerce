import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileUploadRepository } from './files.repository';
import { CloudinaryConfig } from '../config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/entities/product.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), ProductsModule],
  controllers: [FilesController],
  providers: [FilesService, FileUploadRepository, CloudinaryConfig],
})
export class FilesModule {}
