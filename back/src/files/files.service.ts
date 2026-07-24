import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './files.repository';
import { ProductRepository } from 'src/products/products.repository';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FileUploadRepository,
    private readonly productsRepository: ProductRepository,
  ) {}

  async uploadImage(productId: string, file: Express.Multer.File) {
    // Verificar que el producto exista
    await this.productsRepository.getProductById(productId);

    // Subir imagen a Cloudinary
    const result = await this.filesRepository.uploadImage(file);

    if (!result.secure_url) {
      throw new NotFoundException('No fue posible obtener la URL de la imagen');
    }

    // Actualizar imgUrl del producto
    const updatedProduct = await this.productsRepository.updateProduct(
      productId,
      {
        imgUrl: result.secure_url,
      },
    );

    return updatedProduct;
  }
}
