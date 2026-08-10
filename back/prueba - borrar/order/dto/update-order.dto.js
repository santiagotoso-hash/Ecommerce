"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const order_dto_1 = require("./order.dto");
class UpdateOrderDto extends (0, mapped_types_1.PartialType)(order_dto_1.CreateOrderDto) {
}
exports.UpdateOrderDto = UpdateOrderDto;
//# sourceMappingURL=update-order.dto.js.map