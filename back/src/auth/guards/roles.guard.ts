import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../common/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routeRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no tiene roles definidos, deja pasar
    if (!routeRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const userRoles: Role[] = request.user.roles || [];

    const isAllowed = routeRoles.some((role) => userRoles.includes(role));

    if (!isAllowed) {
      throw new ForbiddenException('Usuario sin permisos');
    }

    return true;
  }
}
