import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/roles.enum';
import { ROLES_KEY } from '../../decorators/roles.decorator';

interface RequestWithUser {
  user?: {
    roles?: Role[];
    [key: string]: any;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const routeRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!routeRoles || routeRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const userRoles: Role[] = request.user.roles ?? [];

    const isAllowed = routeRoles.some((role) => userRoles.includes(role));

    if (!isAllowed) {
      throw new ForbiddenException('Usuario sin permisos');
    }

    return true;
  }
}
