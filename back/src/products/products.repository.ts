import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { Repository } from 'typeorm';
import { datosPre } from '../datos/ArchivoDatos';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Products)
    private readonly ormProductRepository: Repository<Products>,
    @InjectRepository(Category)
    private readonly ormCategoryRepository: Repository<Category>,
  ) {}

  async getAllProducts(page: number, limit: number): Promise<Products[]> {
    const skip = (page - 1) * limit;
    const products = await this.ormProductRepository.find({
      relations: {
        category: true,
      },
      skip: skip,
      take: limit,
    });
    return products;
  }

  async addProducts(): Promise<string> {
    const categorias = await this.ormCategoryRepository.find();
    await Promise.all(
      datosPre.map(async (element) => {
        const category = categorias.find(
          (category) => category.name === element.category,
        );
        if (!category) {
          throw new NotFoundException(
            `La categoría ${element.category} no existe`,
          );
        }
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.stock = element.stock;
        product.price = element.price;
        product.category = category;

        await this.ormProductRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Productos agregados';
  }

  async getProductById(id: string): Promise<Products> {
    const product = await this.ormProductRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return product;
  }

  // async updateProduct(
  //   id: string,
  //   product: Partial<CreateProductDto>,
  // ): Promise<Products> {
  //   const existingProduct = await this.getProductById(id);

  //   Object.assign(existingProduct, product);

  //   return await this.ormProductRepository.save(existingProduct);
  // }

  async updateProduct(
    id: string,
    data: Partial<CreateProductDto>,
  ): Promise<Products> {
    const product = await this.getProductById(id);

    Object.assign(product, data);

    return await this.ormProductRepository.save(product);
  }

  async deleteProduct(id: string): Promise<string> {
    const result = await this.ormProductRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return 'Producto eliminado correctamente';
  }
}
