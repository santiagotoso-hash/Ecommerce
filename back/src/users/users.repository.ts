import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
    const users = allUsers.map((user) => {
      const { password, ...userNoPassword } = user;
      return userNoPassword;
    });
    return users;
  }

  async getUserById(id: string): Promise<Omit<Users, 'password' | 'isAdmin'>> {
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
    const { password, isAdmin, ...userNoPassword } = foundUser;
    return userNoPassword;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.ormUserRepository.findOne({
      where: { email },
    });
  }

  async addUser(newUserData: CreateUserDTO): Promise<string> {
    const savedUser = await this.ormUserRepository.save(newUserData);
    return savedUser.id;
  }

  async makeUserAdmin(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.ormUserRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario con el id ${id}`);
    }

    user.isAdmin = true;

    const updatedUser = await this.ormUserRepository.save(user);

    const { password, ...userNoPassword } = updatedUser;

    return userNoPassword;
  }

  async getUserByCountry(
    country: string,
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password' | 'isAdmin'>[]> {
    const skip = (page - 1) * limit;
    const foundUsers = await this.ormUserRepository.find({
      skip: skip,
      take: limit,
      where: { country },
      relations: {
        orders: {
          orderDetail: {
            products: true,
          },
        },
      },
    });
    if (!foundUsers) {
      throw new NotFoundException(
        `No se encontró el usuario del pais ${country}`,
      );
    }

    return foundUsers.map(({ password, isAdmin, ...user }) => user);
  }
}
