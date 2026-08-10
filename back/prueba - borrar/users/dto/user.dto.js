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
exports.LoginUserDto = exports.UpdateUserDTO = exports.CreateUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const matchPassword_decorator_1 = require("../../decorators/matchPassword.decorator");
class CreateUserDTO {
    name;
    email;
    password;
    confirmPassword;
    address;
    phone;
    country;
    city;
    isAdmin;
    isTester;
}
exports.CreateUserDTO = CreateUserDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nombre es requerido' }),
    (0, class_validator_1.IsString)({ message: 'Nombre debe ser texto' }),
    (0, class_validator_1.MinLength)(3, { message: 'Mínimo de 3 caracteres' }),
    (0, class_validator_1.MaxLength)(80, { message: 'Máximo de 3 caracteres' }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email es requerido' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Formato de email inválido' }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password es requerido' }),
    (0, class_validator_1.IsString)({ message: 'Nombre debe ser texto' }),
    (0, class_validator_1.MinLength)(8, { message: 'Mínimo de 8 caracteres' }),
    (0, class_validator_1.MaxLength)(15, { message: 'Máximo de 15 caracteres' }),
    (0, class_validator_1.IsStrongPassword)({}),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*^]).+$/, {
        message: 'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial (!@#$%&*^).',
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password es requerido' }),
    (0, class_validator_1.Validate)(matchPassword_decorator_1.matchPassword, ['password']),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.MinLength)(3, { message: 'Mínimo de 3 caracteres' }),
    (0, class_validator_1.MaxLength)(80, { message: 'Máximo de 80 caracteres' }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Telefono es requerido' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Telefono debe ser string' }),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDTO.prototype, "isAdmin", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDTO.prototype, "isTester", void 0);
class UpdateUserDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(CreateUserDTO, ['email'])) {
}
exports.UpdateUserDTO = UpdateUserDTO;
class LoginUserDto extends (0, mapped_types_1.PickType)(CreateUserDTO, [
    'email',
    'password',
]) {
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=user.dto.js.map