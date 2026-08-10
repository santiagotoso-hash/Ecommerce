import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let JwtServiceMock: Partial<JwtService>;
  let UsersRepositoryMock: Partial<UsersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn() },
        },
        {
          provide: UsersRepository,
          useValue: { getUserByEmail: jest.fn(), addUser: jest.fn() },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    JwtServiceMock = module.get<JwtService>(JwtService);
    UsersRepositoryMock = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('signUp: invoca addUser y devuelve el usuario creado', async () => {
    // El email no existe
    (UsersRepositoryMock.getUserByEmail as jest.Mock).mockResolvedValue(null);

    // bcrypt genera la contraseña encriptada
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    // El repositorio devuelve el usuario creado
    (UsersRepositoryMock.addUser as jest.Mock).mockResolvedValue(
      'Nuevo usuario creado',
    );

    const result = await authService.signUp({
      name: 'Juan',
      email: 'juan@mail.com',
      password: '12345',
      confirmPassword: '12345',
      phone: 123435456,
      address: 'Juan Street',
      city: 'Bariloche',
      country: 'Argentina',
    });

    expect(UsersRepositoryMock.getUserByEmail).toHaveBeenCalledWith(
      'juan@mail.com',
    );

    expect(bcrypt.hash).toHaveBeenCalledWith('12345', 10);

    expect(UsersRepositoryMock.addUser).toHaveBeenCalledWith({
      name: 'Juan',
      email: 'juan@mail.com',
      password: 'hashedPassword',
      confirmPassword: '12345',
      phone: 123435456,
      address: 'Juan Street',
      city: 'Bariloche',
      country: 'Argentina',
    });

    expect(result).toBe('Nuevo usuario creado');
  });

  it('SignIn: Debe llamar a getUserByEmail y devolver token', async () => {
    (UsersRepositoryMock.getUserByEmail as jest.Mock).mockResolvedValue({
      id: '123',
      email: 'test@test.com',
      password: 'hashedPassword',
      isAdmin: false,
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (JwtServiceMock.sign as jest.Mock).mockReturnValue('mockedToken');

    const result = await authService.signIn('test@test.com', 'password');

    expect(UsersRepositoryMock.getUserByEmail).toHaveBeenCalledWith(
      'test@test.com',
    );
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');

    expect(JwtServiceMock.sign).toHaveBeenCalled();

    expect(result.token).toBe('mockedToken');
  });
});
