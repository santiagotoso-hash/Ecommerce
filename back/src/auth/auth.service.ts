import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDTO } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../common/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'Auth service route';
  }

  async signUp(newUserData: CreateUserDTO) {
    const { email, password } = newUserData;

    const foundUser = await this.userRepository.getUserByEmail(email);

    if (foundUser) {
      throw new BadRequestException('Email ya registrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.addUser({
      ...newUserData,
      password: hashedPassword,
    });
  }

  //LOGIN
  async signIn(email: string, password: string) {
    const foundUser = await this.userRepository.getUserByEmail(email);

    if (!foundUser) {
      throw new ForbiddenException('Email o password incorrectos');
    }

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      throw new ForbiddenException('Email o password incorrectos');
    }
    const payload = {
      id: foundUser.id,
      roles: foundUser.isAdmin ? [Role.Admin] : [Role.User],
    };
    const token = this.jwtService.sign(payload);

    return { message: 'Usuario Logueado', token };
  }
}
