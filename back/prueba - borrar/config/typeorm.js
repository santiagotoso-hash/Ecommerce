"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const environment_1 = require("./environment");
const config = {
    type: 'postgres',
    database: environment_1.environment.DB_NAME,
    host: environment_1.environment.DB_HOST,
    port: Number(environment_1.environment.DB_PORT),
    username: environment_1.environment.DB_USERNAME,
    password: environment_1.environment.DB_PASSWORD,
    migrations: ['src/migrations/*.ts'],
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    dropSchema: false,
};
exports.typeOrmConfig = (0, config_1.registerAs)('typeorm', () => config);
//# sourceMappingURL=typeorm.js.map