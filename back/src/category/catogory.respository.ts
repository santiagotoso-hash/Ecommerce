import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

import { datosPre } from '../datos/ArchivoDatos';
import { stringify } from 'querystring';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly ormCategoryRepository: Repository<Category>,
  ) {}

  // GET ALL CATEGORIES
  async findAll(): Promise<Category[]> {
    return this.ormCategoryRepository.find();
  }

  // GET CATEGORY BY ID
  async findById(id: string): Promise<Category> {
    const category = await this.ormCategoryRepository.findOne({
      where: { id: id },
    });

    if (!category) {
      throw new NotFoundException(`No existe una categoría con el id ${id}`);
    }

    return category;
  }

  // POST CATEGORY
  async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.ormCategoryRepository.create(createCategoryDto);

      return await this.ormCategoryRepository.save(category);
    } catch (error) {
      console.error('Error al agregar categoría:', error);

      throw new InternalServerErrorException('No se pudo agregar la categoría');
    }
  }

  // SEEDER
  async addCategories(): Promise<string> {
    try {
      const insertPromises = datosPre.map((element) =>
        this.ormCategoryRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: element.category })
          .orIgnore()
          .execute(),
      );

      await Promise.all(insertPromises);

      return 'Categorías agregadas';
    } catch (error) {
      console.error('Error al agregar categorías:', error);

      throw new InternalServerErrorException(
        'No se pudieron agregar las categorías',
      );
    }
  }

  // DELETE CATEGORY
  async deleteCategory(id: number): Promise<string> {
    try {
      const result = await this.ormCategoryRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`No existe una categoría con el id ${id}`);
      }

      return 'Categoría eliminada correctamente';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Error al eliminar la categoría:', error);

      throw new InternalServerErrorException(
        'No se pudo eliminar la categoría',
      );
    }
  }
}
