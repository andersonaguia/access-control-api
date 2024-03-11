<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# <p align="center">ACCESS CONTROL API</p>

## 💻 Sobre o projeto

É uma API para gerenciamento e controle de acessos de pessoas.

## 🚧 Funcionalidades

- [x] Criar um usuário
- [x] Realizar login
- [x] Alterar senha do usuário

## ⚠️ Pré-requisitos
- Ter o [NodeJS](https://nodejs.org/en/) 21.1.0 instalado na máquina;
- Ter o [NestJS](https://nestjs.com/) 10.2.1 instalado na máquina;
- Ter o [MySql](https://www.mysql.com/) 8.0.34 instalado na máquina;

#

## ⚙️ Configuração da aplicação em modo desenvolvimento

1. Realizar o clone desse repositório

```
git clone https://github.com/andersonaguia/access-control-api.git
```

2. Acessar a pasta do projeto;

```
cd access-control-api
```

3. Instalar as dependências;

```
npm install --legacy-peer-deps
```

4. Renomear o arquivo `.env_example` para `.env` e inserir os dados conforme as configurações do seu servidor e do banco de dados MySQL;

Exemplo:

```
#Application Port
PORT=3001

#SocketIO Port
SOCKET_PORT=8001

#Database
DB_DIALECT=mysql
DB_HOST=localhost ou endereço do servidor de banco de dados
DB_PORT=3306
DB_USER="nome de usuário do banco de dados"
DB_PASS="senha do banco de dados"
DB_NAME=automation

#Jwt Secret
JWT_SECRET="sua senha para utilizar na autenticação JWT"
```
5. Criar um database no `MySQL` chamado `automation` para utilizar no projeto;
```
mysql -u root -p
Enter password: 

mysql> CREATE DATABASE automation CHARACTER SET utf8 COLLATE utf8_general_ci;
```
6. Rodar as migrations para criar as tabelas do banco de dados automaticamente

```
npm run migration:run
```
7. Servir a aplicação em modo desenvolvimento;
```
npm run start:dev
```
#
## 💻 Acessando as rotas da aplicação

### Endpoints disponíveis

#### 🔓 Criar um usuário

##### Para criar um usuário basta realizar uma requisição do tipo `POST` com os dados do `Body` conforme indicado abaixo. Para o campo `role` os seguintes valores serão aceitos: 

```
ADMIN = "admin"
SUPERVISOR = "supervisor"
MANAGER = "manager"
USER = "user"
```


```
POST: http://localhost:3001/auth/signup

Headers: {
	"Content-Type": "application/json"
}
Body: {  
	"fullName": "My Name",
	"email": "my_email@email.com",
	"password": "aA123@456!",
	"passwordConfirmation": "aA123@456!",
	"occupation": "Supervisor",
	"role": "supervisor"	
}
```

**Resultado:**
```
{
	"status": 201,
	"headers": {},
	"body": {
		"statusCode": 201,
		"message": "Usuário cadastrado com sucesso"
	}
}
``` 

#### 🔓 Fazer login

##### Para fazer login na aplicação você realizar uma requisição do tipo `POST` com os dados do `Body` conforme indicado abaixo. Você receberá um `Token JWT`` para acesso às rotas protegidas da aplicação.

```
POST: http://localhost:3001/auth/signin
Headers: {
	"Content-Type": "application/json"
}

Body: {  
	"email": "my_email@email.com",
	"password": "aA123@456!"	
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiQW5kZXJzb24iLCJvY2N1cGF0aW9uIjoiVMOpY25pY28gZW0gTWFudXRlbsOnw6NvIiwiZW1haWwiOiJhbmRlcnNvbmxhZ3VpYXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4MDkwMDU1LCJleHAiOjE2OTg2OTQ4NTV9.At1l6IXX2bnBgVdPpCFLmV63-y3YHJp-ZMTzON4twJI"
	}
}
```

#### 🔒 Alterar senha

##### Para alterar a senha do usuário você realizar uma requisição do tipo `PATCH` com os dados do `Body` conforme indicado abaixo. No cabeçalho da requisição você deverá enviar o `TOKEN` recebido no momento da realização do login.

```
PATCH: http://localhost:3001/auth/changepassword
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}

Body: {  
	"email": "my_email@email.com",
	"oldPassword": "aA123@456!",
	"newPassword": "bB123@456!",
	"newPasswordConfirmation": "bB123@456!"
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"statusCode": 200,
		"message": "Senha alterada com sucesso"		
	}
}
```

#### 🔒 Cadastrar uma porta

##### Para cadastrar uma nova porta você deve realizar uma requisição do tipo `POST` com os dados do `Body` conforme indicado abaixo. No cabeçalho da requisição você deverá enviar o `TOKEN` recebido no momento da realização do login. Para o campo `state` os seguintes valores serão aceitos: 

```
OPEN = 0,
MAINTENANCE = 1,
CLEANING = 2,
CLOSED = 3,
```

```
POST: http://localhost:3001/doors/new
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}

Body: {  
	"name": "Entrada Principal", 
	"readerModel": "HID MIFARE", 
	"isOpen": false,
    "state" : 0
}
```
**Resultado:**
```
{
	"status": 201,
	"headers": {},
	"body": {
		"statusCode": 201,
		"message": "Usuário cadastrado com sucesso!"	
	}
}
```


#### Abrir ou fechar uma porta

##### Para abrir ou fechar uma porta você deve realizar uma requisição do tipo `PATCH` com os dados do `Body` conforme indicado abaixo. Na chave `isOpen` envie `true` para abrir ou `false` para fechar.

```
POST: http://localhost:3001/doors/access
Headers: {
	"Content-Type": "application/json"
}

Body: {  
	"doorId": 1,
    "isOpen": true,
    "cardNumber": "123456"
}
```
**Resultado:**
```
{
	"statusCode": 200,
    "message": "Dados atualizados com sucesso"
}
```

#### 🔒 Mudar o estado de uma porta

##### Para mudar o estado de uma porta você deve realizar uma requisição do tipo `PATCH` com os dados do `Body` conforme indicado abaixo. No cabeçalho da requisição você deverá enviar o `TOKEN` recebido no momento da realização do login. Para o campo `state` os seguintes valores serão aceitos: 

```
OPEN = 0,
MAINTENANCE = 1,
CLEANING = 2,
CLOSED = 3,
```

```
POST: http://localhost:3001/doors/changestate
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}

Body: {  
	"doorId": 1,
    "state": 2
}
```
**Resultado:**
```
{
	"statusCode": 200,
    "message": "Dados atualizados com sucesso"
}
```

#### Buscar todas as portas disponíveis

##### Para buscar todas as portas cadastradas você deve realizar uma requisição do tipo `GET`conforme indicado abaixo.

```
GET: http://localhost:3001/doors/findall
Headers: {
	"Content-Type": "application/json"
}
```
**Resultado:**
```
[
    {
        "id": 1,
        "createdAt": "2024-03-09T01:44:07.082Z",
        "updatedAt": "2024-03-11T17:10:24.169Z",
        "deletedAt": null,
        "name": "ACADEMIA",
        "readerModel": "HID MIFARE",
        "isOpen": true,
        "state": 0,
        "registeredBy": 3
    },
    {
        "id": 7,
        "createdAt": "2024-03-09T10:45:08.017Z",
        "updatedAt": "2024-03-11T17:05:18.437Z",
        "deletedAt": null,
        "name": "LAVANDERIA",
        "readerModel": "HID MIFARE",
        "isOpen": true,
        "state": 0,
        "registeredBy": 3
    },
    {
        "id": 9,
        "createdAt": "2024-03-11T20:32:33.224Z",
        "updatedAt": "2024-03-11T20:32:33.234Z",
        "deletedAt": null,
        "name": "ENTRADA SOCIAL",
        "readerModel": "HID MIFARE",
        "isOpen": false,
        "state": 0,
        "registeredBy": 3
    }
]
```

#### 🔒 lorem ipsum

##### lorem ipsum:



## 🛠 Tecnologias

[![NodeJS Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&link=https://nodejs.org/en/)](https://nodejs.org/en/)

[![TypeScript Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&link=https://www.typescriptlang.org/)](https://www.typescriptlang.org/)	

[![NestJS Badge](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white&link=https://nestjs.com/)](https://nestjs.com/)

[![ExpressJS Badge](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white&link=https://expressjs.com/)](https://expressjs.com/)

[![NpmJS Badge](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white&link=https://www.npmjs.com/)](https://www.npmjs.com/)

[![Insomnia Badge](
https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white&link=https://insomnia.rest/)](https://insomnia.rest/)

[![Prettier Badge](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E&link=https://prettier.io/)](https://prettier.io/)

[![Mysql Badge](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

## 🦸 Autor

<div style="display: flex; flex-direction: column; align-items: center">
<h3>Anderson Aguiar</h3>
<a href="https://www.linkedin.com/in/andersonlaguiar/" target="_blank">
<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="logo linkedin" style="width: 150px; height: 30px;">
</a>
</div>

## 📝 Licença

Este projeto está sob a licença [MIT](./LICENSE).


