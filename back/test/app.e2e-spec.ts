import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth e2e', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  //CREAR USUARIO
  describe('POST /auth/signup', () => {
    it('Debe crear un nuevo usuario', async () => {
      const newUser = {
        name: 'test',
        email: `test2@test.com`,
        password: 'Password1@',
        confirmPassword: 'Password1@',
        address: 'Calle Mitre 845',
        phone: 3414567821,
        country: 'Argentina',
        city: 'Rosario',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(newUser);

      console.log('STATUS:', response.status);
      console.log('BODY:', response.body);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    //SIGN IN
  });

  describe('POST /auth/signin', () => {
    it('Debe iniciar sesión y devolver un JWT', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: `test2@test.com`,
          password: 'Password1@',
        });

      console.log('SIGNIN STATUS:', response.status);
      console.log('SIGNIN BODY:', response.body);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });
  });
  describe('POST /auth/signin', () => {
    it('Debe iniciar sesión y devolver un JWT', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: 'test2@test.com',
          password: 'Password1@',
        })
        .expect(201); // tu controller actualmente devuelve 201

      token = response.body.token;

      console.log('TOKEN:', token);

      expect(token).toBeDefined();
    });
    // GET PRODUCTS
    describe('GET /products', () => {
      it('Debe devolver productos con JWT válido', async () => {
        const response = await request(app.getHttpServer())
          .get('/products')
          .set('Authorization', `Bearer ${token}`)
          .expect(200);

        console.log('PRODUCTS:', response.body);

        expect(response.body).toBeDefined();
      });
    });
  });
});
