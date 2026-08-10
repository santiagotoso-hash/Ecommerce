"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("./config/typeorm");
const category_module_1 = require("./category/category.module");
const orders_module_1 = require("./order/orders.module");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const category_service_1 = require("./category/category.service");
const products_service_1 = require("./products/products.service");
const files_module_1 = require("./files/files.module");
const jwt_1 = require("@nestjs/jwt");
const environment_1 = require("./config/environment");
let AppModule = class AppModule {
    categoryService;
    productsService;
    constructor(categoryService, productsService) {
        this.categoryService = categoryService;
        this.productsService = productsService;
    }
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
    async onApplicationBootstrap() {
        await this.categoryService.addCategory();
        console.log('Categorias cargadas desde el seeder');
        await this.productsService.addProducts();
        console.log('Productos cargados desde el seeder');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.typeOrmConfig],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configservice) => configservice.get('typeorm'),
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            orders_module_1.OrderModule,
            files_module_1.FilesModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: environment_1.environment.JWT_SECRET,
                signOptions: { expiresIn: '60min' },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        products_service_1.ProductsService])
], AppModule);
//# sourceMappingURL=app.module.js.map