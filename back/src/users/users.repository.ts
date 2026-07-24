import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, User } from './users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private ormUserRepository: Repository<Users>,
  ) {}

  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit;
    const allUsers = await this.ormUserRepository.find({
      skip: skip,
      take: limit,
    });
    return allUsers.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string): Promise<Omit<Users, 'password'>> {
    const foundUser = await this.ormUserRepository.findOne({
      where: { id },
      relations: {
        orders: {
          orderDetail: {
            products: true,
          },
        },
      },
    });
    if (!foundUser) {
      throw new NotFoundException(`No se encontró el usuario con el id ${id}`);
    }
    const { password, ...userNoPassword } = foundUser;
    return userNoPassword;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.ormUserRepository.findOne({
      where: { email },
    });
  }

  async addUser(newUserData: CreateUserDto): Promise<string> {
    try {
      const savedUser = await this.ormUserRepository.save(newUserData);
      return savedUser.id;
    } catch (error) {
      const err = error as { code?: string };

      if (err.code === '23505') {
        throw new BadRequestException('Ya existe un usuario con ese email.');
      }

      throw error;
    }
  }

  async updateUser(
    id: string,
    newUserData: UpdateUserDTO,
  ): Promise<Omit<Users, 'password'>> {
    const user = await this.ormUserRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario con el id ${id}`);
    }
    const mergedUser = this.ormUserRepository.merge(user, newUserData);

    const updatedUser = await this.ormUserRepository.save(mergedUser);

    const { password, ...userNoPassword } = updatedUser;

    return userNoPassword;
  }
}
