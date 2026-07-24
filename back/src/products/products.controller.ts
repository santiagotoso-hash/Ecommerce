import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { CreateProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  addProdcuts() {
    return this.productsService.addProducts();
  }
  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit)
      return this.productsService.getProducts(Number(page), Number(limit));
    return this.productsService.getProducts(Number(1), Number(5));
  }

  @Get(':id')
  @HttpCode(200)
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  // @Post()
  // @HttpCode(201)
  // async createProduct(@Body() product: CreateProductDto) {
  //   const newProduct = await this.productsService.createProduct(product);

  //   return {
  //     id: newProduct.id,
  //   };
  // }

  @Put(':id')
  @HttpCode(200)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: CreateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @HttpCode(200)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: File) {
    return file;
  }
}
