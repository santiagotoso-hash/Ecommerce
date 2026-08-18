import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { CategoryService } from './category.service';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth('access-token')
  @Get('seeder')
  addCategories() {
    return this.categoryService.addCategories();
  }

  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findById(id);
  }

  @ApiBearerAuth('access-token')
  @Post()
  @ApiOperation({
    summary: 'Crear una categoría',
  })
  @ApiBody({
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada correctamente',
    type: Category,
  })
  addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.addCategory(createCategoryDto);
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
