import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersRepository } from './users.repository';
import { Users } from './entities/user.entity';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let ormRepository: jest.Mocked<Repository<Users>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);

    ormRepository = module.get(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('addUser', () => {
    it('debe guardar un usuario y devolver su id', async () => {
      // Arrange
      const createUserDto = {
        name: 'Juan',
        email: 'juan@mail.com',
        password: '123456',
        confirmPassword: '123456',
        phone: 123456789,
        address: 'Calle 123',
        city: 'Bariloche',
        country: 'Argentina',
      };

      ormRepository.save.mockResolvedValue({
        id: 'abc123',
        ...createUserDto,
        isAdmin: false,
        orders: [],
      });

      const result = await usersRepository.addUser(createUserDto);

      // Assert
      expect(ormRepository.save).toHaveBeenCalledWith(createUserDto);
      expect(result).toBe('abc123');
    });
  });
});
