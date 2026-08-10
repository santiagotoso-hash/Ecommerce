import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import { environment } from '../../config/environment';
import { Role } from '../../common/roles.enum';

interface JwtPayload {
  id: string;
  roles: Role[];
}

interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token não informado.');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token inválido.');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: environment.JWT_SECRET,
      });

      request.user = payload;
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expirado.');
      }

      if (error instanceof NotBeforeError) {
        throw new UnauthorizedException('Token ainda não é válido.');
      }

      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Token inválido.');
      }

      throw new UnauthorizedException('Falha na autenticação.');
    }

    return true;
  }
}
