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
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const ArchivoDatos_1 = require("../datos/ArchivoDatos");
let CategoryRepository = class CategoryRepository {
    ormCategoryRepository;
    constructor(ormCategoryRepository) {
        this.ormCategoryRepository = ormCategoryRepository;
    }
    async getAllCategories() {
        return this.ormCategoryRepository.find();
    }
    async addCategories() {
        try {
            const insertPromises = ArchivoDatos_1.datosPre.map((element) => this.ormCategoryRepository
                .createQueryBuilder()
                .insert()
                .into(category_entity_1.Category)
                .values({ name: element.category })
                .orIgnore()
                .execute());
            await Promise.all(insertPromises);
            return 'Categorías agregadas';
        }
        catch (error) {
            console.error('Error al agregar categorías:', error);
            throw new common_1.InternalServerErrorException('No se pudieron agregar las categorías');
        }
    }
    async deleteCategory(id) {
        try {
            const result = await this.ormCategoryRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`No existe una categoría con el id ${id}`);
            }
            return 'Categoría eliminada correctamente';
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error al eliminar la categoría:', error);
            throw new common_1.InternalServerErrorException('No se pudo eliminar la categoría');
        }
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryRepository);
//# sourceMappingURL=catogory.respository.js.map