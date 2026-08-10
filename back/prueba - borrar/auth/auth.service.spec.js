"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const users_repository_1 = require("../users/users.repository");
describe('AuthService', () => {
    let service;
    let JwtServiceMock;
    let UsersRepositoryMock;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: users_repository_1.UsersRepository,
                    useValue: { getUserByEmail: jest.fn(), addUser: jest.fn() },
                },
                {
                    provide: jwt_1.JwtService,
                    useValue: { sign: jest.fn() },
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=auth.service.spec.js.map