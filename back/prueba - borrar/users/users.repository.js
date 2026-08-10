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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
let UsersRepository = class UsersRepository {
    ormUserRepository;
    constructor(ormUserRepository) {
        this.ormUserRepository = ormUserRepository;
    }
    async getAllUsers(page, limit) {
        const skip = (page - 1) * limit;
        const allUsers = await this.ormUserRepository.find({
            skip: skip,
            take: limit,
        });
        return allUsers.map(({ password, ...userNoPassword }) => userNoPassword);
    }
    async getUserById(id) {
        const foundUser = await this.ormUserRepository.findOne({
            where: { id },
            relations: {
                orders: {
                    orderDetail: {
                        products: true,
                    },
                },
            },
        });
        if (!foundUser) {
            throw new common_1.NotFoundException(`No se encontró el usuario con el id ${id}`);
        }
        const { password, isAdmin, ...userNoPassword } = foundUser;
        return userNoPassword;
    }
    async getUserByEmail(email) {
        return await this.ormUserRepository.findOne({
            where: { email },
        });
    }
    async addUser(newUserData) {
        const savedUser = await this.ormUserRepository.save(newUserData);
        return savedUser.id;
    }
    async updateUser(id, newUserData) {
        const user = await this.ormUserRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`No se encontró el usuario con el id ${id}`);
        }
        const mergedUser = this.ormUserRepository.merge(user, newUserData);
        const updatedUser = await this.ormUserRepository.save(mergedUser);
        const { password, ...userNoPassword } = updatedUser;
        return userNoPassword;
    }
    async deleteUserById(id) {
        const result = await this.ormUserRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Usuario con id ${id} no encontrado.`);
        }
        return 'Usuario eliminado correctamente.';
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map