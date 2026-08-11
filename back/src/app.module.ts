import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/orders.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CategoryService } from './category/category.service';
import { ProductsService } from './products/products.service';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from './config/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) =>
        configservice.get('typeorm')!,
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoryModule,
    OrderModule,
    FilesModule,
    JwtModule.register({
      global: true,
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '60min' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productsService: ProductsService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  async onApplicationBootstrap() {
    await this.categoryService.addCategories();
    console.log('Categorias cargadas desde el seeder');

    await this.productsService.addProducts();
    console.log('Productos cargados desde el seeder');
  }
}
