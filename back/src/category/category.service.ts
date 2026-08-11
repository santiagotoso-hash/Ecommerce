import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './catogory.respository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  // POST
  async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.addCategory(createCategoryDto);
  }

  // SEEDER
  async addCategories(): Promise<string> {
    return this.categoryRepository.addCategories();
  }

  // GET ALL
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  // GET BY ID
  async findById(id: number): Promise<Category> {
    return this.categoryRepository.findById(id);
  }

  // DELETE
  async deleteCategory(id: number): Promise<string> {
    return this.categoryRepository.deleteCategory(id);
  }
}
