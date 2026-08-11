PM4BE — E-commerce Backend API

Backend de uma API REST para uma plataforma de e-commerce, desenvolvida com NestJS, PostgreSQL e TypeORM.

O projeto possui funcionalidades para gerenciamento de usuários, autenticação, produtos, categorias, pedidos e detalhes dos pedidos.

🚀 Tecnologias
NestJS
TypeScript
PostgreSQL
TypeORM
JWT
bcrypt
Swagger
class-validator / ValidationPipe
📦 Funcionalidades
🔐 Auth
Cadastro de usuários
Login de usuários
Autenticação através de JWT
Controle de acesso por roles
👤 Users
Gerenciamento de usuários
Consulta de usuários
Controle de usuários administradores
🛍️ Products
CRUD de produtos
Consulta de produtos
Atualização de produtos
Paginação na listagem
📂 Categories
Gerenciamento de categorias
Consulta de categorias
🧾 Orders
Criação de pedidos
Consulta de pedidos
Consulta de pedido por ID
Associação de produtos aos pedidos
📋 Order Details

Os OrderDetails representam os itens relacionados aos pedidos e permitem associar produtos às respectivas ordens.

🏗️ Estrutura do projeto
src/
├── auth/
├── category/
├── files/
├── order/
├── products/
├── users/
├── app.controller.ts
├── app.module.ts
└── main.ts
⚙️ Instalação

Clone o repositório:

git clone https://github.com/pi-rym/PM4BE-santiagotoso-hash.git

Entre na pasta:

cd PM4BE-santiagotoso-hash

Instale as dependências:

npm install
🔐 Configuração

A aplicação utiliza variáveis de ambiente através do módulo de configuração do projeto.

Crie um arquivo .env com as configurações necessárias para o ambiente.

Exemplo:

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your-secret-key
PORT=3000
DB_HOST=localhost

Os nomes e valores definitivos das variáveis devem corresponder ao arquivo de configuração environment utilizado pelo projeto.

Nunca versione o arquivo .env no Git.

🗄️ Banco de dados

O projeto utiliza:

PostgreSQL como banco de dados
TypeORM como ORM

A conexão é configurada através das variáveis de ambiente.

▶️ Executando a aplicação
Desenvolvimento
npm run start:dev
Produção

Primeiro compile:

npm run build

Depois execute:

npm run start:prod

A aplicação utiliza a porta definida pela variável de ambiente PORT.

Por padrão, caso configurada como 3000:

http://localhost:3000
📚 Swagger

A API possui documentação integrada através do Swagger.

A documentação é disponibilizada na rota:

http://localhost:3000/api

O título da documentação é:

Proyecto Integrador M4 - Back - Ecommerce

Versão:

1.0.0

A API está configurada para autenticação Bearer utilizando JWT.

No Swagger, utilize:

Authorize

e informe:

Bearer SEU_TOKEN

O esquema de autenticação configurado na documentação é:

HTTP Bearer
JWT
🛡️ Validação

A aplicação utiliza o ValidationPipe global do NestJS:

app.useGlobalPipes(
new ValidationPipe({
whitelist: true,
}),
);

Com whitelist: true, propriedades que não estiverem declaradas nos DTOs de validação são removidas dos objetos recebidos pela API.

Os DTOs são utilizados para controlar e validar os dados recebidos pelos endpoints.

🔑 Autenticação

Os endpoints protegidos utilizam JWT.

Depois de realizar o login, o token retornado deve ser enviado no header:

Authorization: Bearer SEU_TOKEN

Exemplo:

GET /products
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
👥 Autorização

O projeto possui controle de acesso baseado em roles.

Os usuários podem possuir diferentes níveis de acesso, incluindo:

USER
ADMIN

A autorização é implementada através dos Guards do NestJS.

🧪 Testes

Execute os testes com:

npm run test

Modo watch:

npm run test:watch
📌 Objetivo

O projeto foi desenvolvido como uma API backend de e-commerce, aplicando conceitos de:

NestJS
TypeScript
API REST
PostgreSQL
TypeORM
JWT
bcrypt
Swagger
DTOs
Validação
Guards
Roles
CRUD
Relacionamentos entre entidades
👨‍💻 Autor

Santiago Toso
