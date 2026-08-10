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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const category_entity_1 = require("../category/entities/category.entity");
const typeorm_2 = require("typeorm");
const ArchivoDatos_1 = require("../datos/ArchivoDatos");
let ProductRepository = class ProductRepository {
    ormProductRepository;
    ormCategoryRepository;
    constructor(ormProductRepository, ormCategoryRepository) {
        this.ormProductRepository = ormProductRepository;
        this.ormCategoryRepository = ormCategoryRepository;
    }
    async getAllProducts(page, limit) {
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
    async addProducts() {
        const categorias = await this.ormCategoryRepository.find();
        await Promise.all(ArchivoDatos_1.datosPre.map(async (element) => {
            const category = categorias.find((category) => category.name === element.category);
            if (!category) {
                throw new common_1.NotFoundException(`La categoría ${element.category} no existe`);
            }
            const product = new product_entity_1.Products();
            product.name = element.name;
            product.description = element.description;
            product.stock = element.stock;
            product.price = element.price;
            product.category = category;
            await this.ormProductRepository
                .createQueryBuilder()
                .insert()
                .into(product_entity_1.Products)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute();
        }));
        return 'Productos agregados';
    }
    async getProductById(id) {
        const product = await this.ormProductRepository.findOne({
            where: { id },
            relations: {
                category: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return product;
    }
    async updateProduct(id, data) {
        const product = await this.getProductById(id);
        Object.assign(product, data);
        return await this.ormProductRepository.save(product);
    }
    async deleteProduct(id) {
        const result = await this.ormProductRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return 'Producto eliminado correctamente';
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductRepository);
//# sourceMappingURL=products.repository.js.map