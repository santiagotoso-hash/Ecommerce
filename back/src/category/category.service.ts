import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './catogory.respository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  findAll() {
    return this.categoryRepository.getAllCategories();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  removeCategory(id: number) {
    return this.categoryRepository.deleteCategory(id);
  }

  addCategory() {
    return this.categoryRepository.addCategories();
  }
}
