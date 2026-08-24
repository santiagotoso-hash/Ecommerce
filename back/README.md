# PM4 Backend - Ecommerce

API REST para una plataforma de ecommerce, desarrollada con **NestJS**, **TypeORM** y **PostgreSQL**. Incluye autenticación con JWT, documentación interactiva con Swagger, carga de imágenes a Cloudinary, y gestión de usuarios, productos, categorías y órdenes.

Desarrollado por **Santiago Toso**.

## Tecnologías

- [NestJS](https://nestjs.com/) — framework de Node.js
- [TypeORM](https://typeorm.io/) — ORM para PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) — base de datos relacional
- [JWT](https://jwt.io/) — autenticación basada en tokens
- [Cloudinary](https://cloudinary.com/) — almacenamiento y gestión de imágenes
- [Swagger](https://swagger.io/) — documentación de la API
- [Docker](https://www.docker.com/) / Docker Compose — contenedores y orquestación

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/)

No hace falta tener Node.js ni PostgreSQL instalados localmente; todo corre dentro de los contenedores.

## Instalación y ejecución

1. Cloná el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd back
   ```

2. Creá un archivo `.env` en la raíz del proyecto, basado en las variables de la sección [Variables de entorno](#variables-de-entorno).

3. Levantá los contenedores:

   ```bash
   docker-compose up --build
   ```

4. La API va a estar disponible en:

   ```
   http://localhost:3000
   ```

5. La documentación interactiva de Swagger está en:
   ```
   http://localhost:3000/api
   ```

### Detener los contenedores

```bash
docker-compose down
```

Si querés borrar también los datos persistidos de la base (por ejemplo, para reiniciar la base de datos desde cero):

```bash
docker-compose down -v
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```dotenv
# App
PORT=3000

# Base de datos (usada por la app NestJS)
DB_NAME=ecommerce
DB_HOST=postgresdb
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123456

# Base de datos (usada por el contenedor de PostgreSQL)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_DB=ecommerce

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=8h
```

> ⚠️ `DB_HOST` debe coincidir con el nombre del servicio de PostgreSQL definido en `docker-compose.yaml` (`postgresdb`), no con `localhost`.
> ⚠️ `DB_PASSWORD` y `POSTGRES_PASSWORD` deben tener el mismo valor.

## Estructura de módulos

| Módulo     | Descripción                                        |
| ---------- | -------------------------------------------------- |
| `auth`     | Registro e inicio de sesión, autenticación con JWT |
| `users`    | Gestión de usuarios                                |
| `products` | Gestión de productos, carga de imágenes            |
| `category` | Gestión de categorías                              |
| `order`    | Gestión de órdenes de compra                       |
| `files`    | Carga de imágenes a Cloudinary                     |

## Principales endpoints

### Auth

| Método | Ruta           | Descripción         |
| ------ | -------------- | ------------------- |
| POST   | `/auth/signup` | Registro de usuario |
| POST   | `/auth/signin` | Inicio de sesión    |

### Users

| Método | Ruta                  | Descripción                  |
| ------ | --------------------- | ---------------------------- |
| GET    | `/users`              | Listar usuarios              |
| GET    | `/users/:id`          | Obtener usuario por ID       |
| GET    | `/users/search/email` | Buscar usuario por email     |
| GET    | `/users/country`      | Filtrar usuarios por país    |
| PATCH  | `/users/:id/admin`    | Cambiar rol de administrador |

### Products

| Método | Ruta               | Descripción                |
| ------ | ------------------ | -------------------------- |
| GET    | `/products`        | Listar productos           |
| GET    | `/products/:id`    | Obtener producto por ID    |
| PUT    | `/products/:id`    | Actualizar producto        |
| DELETE | `/products/:id`    | Eliminar producto          |
| POST   | `/products/upload` | Subir imagen de producto   |
| GET    | `/products/seeder` | Cargar productos de prueba |

### Category

| Método | Ruta               | Descripción                 |
| ------ | ------------------ | --------------------------- |
| GET    | `/category`        | Listar categorías           |
| GET    | `/category/:id`    | Obtener categoría por ID    |
| POST   | `/category`        | Crear categoría             |
| DELETE | `/category/:id`    | Eliminar categoría          |
| GET    | `/category/seeder` | Cargar categorías de prueba |

### Orders

| Método | Ruta          | Descripción          |
| ------ | ------------- | -------------------- |
| GET    | `/orders`     | Listar órdenes       |
| POST   | `/orders`     | Crear orden          |
| GET    | `/orders/:id` | Obtener orden por ID |
| DELETE | `/orders/:id` | Eliminar orden       |

### Files

| Método | Ruta                     | Descripción                        |
| ------ | ------------------------ | ---------------------------------- |
| POST   | `/files/uploadImage/:id` | Subir imagen asociada a un recurso |

> La documentación completa e interactiva de todos los endpoints, con la posibilidad de probarlos, está disponible en Swagger: `http://localhost:3000/api`

## Autenticación

La mayoría de los endpoints protegidos requieren un token JWT. Para autenticarte:

1. Registrate con `POST /auth/signup` o iniciá sesión con `POST /auth/signin`.
2. Copiá el `access_token` recibido en la respuesta.
3. En Swagger, hacé clic en **Authorize** e ingresá el token con el formato `Bearer <token>`.

## Licencia

Proyecto desarrollado con fines educativos, sin licencia formal asociada.
