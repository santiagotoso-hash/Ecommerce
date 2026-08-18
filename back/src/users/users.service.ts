import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './entities/user.entity';
import { CreateUserDTO } from './dto/user.dto';
import { UpdateUserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers(page: number, limit: number) {
    return this.usersRepository.getAllUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  async makeUserAdmin(id: string) {
    return this.usersRepository.makeUserAdmin(id);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`No existe usuario con email ${email}`);
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async getUserByCountry(country: string, page: number, limit: number) {
    return this.usersRepository.getUserByCountry(country, page, limit);
  }
}
