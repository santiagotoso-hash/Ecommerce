import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { datosPre } from '../datos/ArchivoDatos';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly ormCategoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.ormCategoryRepository.find();
  }

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
