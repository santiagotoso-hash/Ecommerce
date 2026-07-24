import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  getAuth(): string {
    return 'Auth service route';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    const foundUser = await this.userRepository.getUserByEmail(email);
    if (!foundUser) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    if (foundUser.password !== password) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    return 'Usuario Logueado(EsteEsElToken)';
  }
}
