import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  // Instancia del servicio que vamos a probar
  let service: UsersService;

  // Mock del repositorio
  let usersRepository: {
    getUserByEmail: jest.Mock;
  };

  beforeEach(async () => {
    // Creamos el mock del repositorio
    usersRepository = {
      getUserByEmail: jest.fn(),
    };

    // Creamos un módulo de pruebas de Nest
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          // Reemplazamos el repositorio real por el mock
          provide: UsersRepository,
          useValue: usersRepository,
        },
      ],
    }).compile();

    // Obtenemos la instancia del servicio
    service = module.get<UsersService>(UsersService);
  });

  // Verifica que el servicio exista
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByEmail', () => {
    it('debe devolver el usuario sin la contraseña', async () => {
      // ==========================
      // Arrange
      // ==========================

      // Usuario que devolverá el repositorio
      const mockUser = {
        id: '1',
        name: 'Juan',
        email: 'juan@mail.com',
        password: 'hashedPassword',
        phone: 123456789,
        address: 'Calle 123',
        city: 'Bariloche',
        country: 'Argentina',
        isAdmin: false,
      };

      // El repositorio encuentra el usuario
      usersRepository.getUserByEmail.mockResolvedValue(mockUser);

      // ==========================
      // Act
      // ==========================

      const result = await service.getUserByEmail('juan@mail.com');

      // ==========================
      // Assert
      // ==========================

      // Verifica que el repositorio fue llamado correctamente
      expect(usersRepository.getUserByEmail).toHaveBeenCalledTimes(1);

      expect(usersRepository.getUserByEmail).toHaveBeenCalledWith(
        'juan@mail.com',
      );

      // Verifica que la contraseña NO venga en la respuesta
      expect(result).toEqual({
        id: '1',
        name: 'Juan',
        email: 'juan@mail.com',
        phone: 123456789,
        address: 'Calle 123',
        city: 'Bariloche',
        country: 'Argentina',
        isAdmin: false,
      });

      expect(result).not.toHaveProperty('password');
    });

    it('debe lanzar NotFoundException si el usuario no existe', async () => {
      // ==========================
      // Arrange
      // ==========================

      // El repositorio no encuentra ningún usuario
      usersRepository.getUserByEmail.mockResolvedValue(null);

      // ==========================
      // Act + Assert
      // ==========================

      await expect(service.getUserByEmail('noexiste@mail.com')).rejects.toThrow(
        NotFoundException,
      );

      // Verifica que el repositorio fue llamado
      expect(usersRepository.getUserByEmail).toHaveBeenCalledWith(
        'noexiste@mail.com',
      );
    });
  });
});
