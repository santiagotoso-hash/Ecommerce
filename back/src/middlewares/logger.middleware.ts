import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//implementar los colores
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
// elegir os colores por request.method
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
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
    console.log(
      // `[${fechaHora}]Ejecutando un método ${req.method} en la ruta ${req.originalUrl}`,
      `${colors.cyan}[${fechaHora}]${colors.reset} ` +
        `${methodColor}${req.method}${colors.reset} ` +
        `${colors.white}${req.originalUrl}${colors.reset}`,
    );
    next();
  }
}
