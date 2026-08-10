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
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("./entities/orders.entity");
const orderDetails_entity_1 = require("./entities/orderDetails.entity");
const user_entity_1 = require("../users/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
const common_2 = require("@nestjs/common");
let OrdersRepository = class OrdersRepository {
    ormOrdersRepository;
    ormOrderDetailsRepository;
    ormUsersRepository;
    ormProductsRepository;
    constructor(ormOrdersRepository, ormOrderDetailsRepository, ormUsersRepository, ormProductsRepository) {
        this.ormOrdersRepository = ormOrdersRepository;
        this.ormOrderDetailsRepository = ormOrderDetailsRepository;
        this.ormUsersRepository = ormUsersRepository;
        this.ormProductsRepository = ormProductsRepository;
    }
    async getAllOrders() {
        return await this.ormOrdersRepository.find({
            relations: {
                users: true,
                orderDetail: {
                    products: true,
                },
            },
        });
    }
    async getOrderById(id) {
        const order = await this.ormOrdersRepository.findOne({
            where: { id },
            relations: {
                orderDetail: {
                    products: true,
                },
            },
        });
        if (!order) {
            throw new common_2.NotFoundException(`Orden con id ${id} no encontrada`);
        }
        return order;
    }
    async addOrder(createOrderDto) {
        const { userId, products } = createOrderDto;
        const user = await this.ormUsersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_2.NotFoundException(`Usuario con id ${userId} no encontrado`);
        }
        const order = new orders_entity_1.Orders();
        order.date = new Date();
        order.users = user;
        const newOrder = await this.ormOrdersRepository.save(order);
        const productsArray = await Promise.all(products.map(async (element) => {
            const product = await this.ormProductsRepository.findOneBy({
                id: element.id,
            });
            if (!product) {
                throw new common_2.NotFoundException(`Producto con id ${element.id} no encontrado`);
            }
            if (product.stock < 1) {
                throw new common_2.BadRequestException(`No hay stock disponible para ${product.name}`);
            }
            await this.ormProductsRepository.update({ id: element.id }, { stock: product.stock - 1 });
            return product;
        }));
        const total = productsArray.reduce((sum, product) => sum + Number(product.price), 0);
        const orderDetail = new orderDetails_entity_1.OrderDetails();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.orders = newOrder;
        await this.ormOrderDetailsRepository.save(orderDetail);
        const savedOrder = await this.ormOrdersRepository.findOne({
            where: { id: newOrder.id },
            relations: {
                orderDetail: {
                    products: true,
                },
            },
        });
        if (!savedOrder) {
            throw new common_2.NotFoundException(`Order con id ${newOrder.id} no encontrada`);
        }
        return savedOrder;
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(1, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map