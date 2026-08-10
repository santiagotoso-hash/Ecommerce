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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const files_repository_1 = require("./files.repository");
const products_repository_1 = require("../products/products.repository");
let FilesService = class FilesService {
    filesRepository;
    productsRepository;
    constructor(filesRepository, productsRepository) {
        this.filesRepository = filesRepository;
        this.productsRepository = productsRepository;
    }
    async uploadImage(productId, file) {
        await this.productsRepository.getProductById(productId);
        const result = await this.filesRepository.uploadImage(file);
        if (!result.secure_url) {
            throw new common_1.NotFoundException('No fue posible obtener la URL de la imagen');
        }
        const updatedProduct = await this.productsRepository.updateProduct(productId, {
            imgUrl: result.secure_url,
        });
        return updatedProduct;
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [files_repository_1.FileUploadRepository,
        products_repository_1.ProductRepository])
], FilesService);
//# sourceMappingURL=files.service.js.map