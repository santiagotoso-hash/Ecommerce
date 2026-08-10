"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const environment_1 = require("./config/environment");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const PORT = Number(environment_1.environment.PORT);
    const HOST = environment_1.environment.DB_HOST;
    await app.listen(PORT);
    console.log(`Server is running on http://${HOST}:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map