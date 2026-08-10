"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
};
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        let methodColor = colors.white;
        switch (req.method) {
            case 'GET':
                methodColor = colors.green;
                break;
            case 'POST':
                methodColor = colors.blue;
                break;
            case 'PUT':
                methodColor = colors.yellow;
                break;
            case 'DELETE':
                methodColor = colors.red;
                break;
            case 'PATCH':
                methodColor = colors.magenta;
                break;
        }
        const fechaHora = new Date().toLocaleString();
        console.log(`${colors.cyan}[${fechaHora}]${colors.reset} ` +
            `${methodColor}${req.method}${colors.reset} ` +
            `${colors.white}${req.originalUrl}${colors.reset}`);
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map