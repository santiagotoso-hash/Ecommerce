import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  addProducts() {
    return this.productRepository.addProducts();
  }

  getProducts(page: number, limit: number, order: 'asc' | 'desc') {
    return this.productRepository.getAllProducts(page, limit, order);
  }

  getProductById(id: string) {
    return this.productRepository.getProductById(id);
  }
  // createProduct(product: CreateProductDto) {
  //   return this.productRepository.addProducts(product);
  // }
  updateProduct(id: string, product: Partial<CreateProductDto>) {
    return this.productRepository.updateProduct(id, product);
  }
  deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
}
