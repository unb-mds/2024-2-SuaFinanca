# Documentação de Configuração de Ambiente

Este documento tem como objetivo orientar o processo de configuração do ambiente de desenvolvimento do projeto “Seu Fundo”. O objetivo é garantir que novos desenvolvedores ou parceiros possam começar a trabalhar de forma eficiente, reduzir barreiras técnicas e se envolver no projeto.

A configuração correta do ambiente é essencial para que os testes reverso, direto e automatizado funcionem corretamente. Neste guia, você encontrará instruções detalhadas sobre instalação de dependências, configuração de variáveis ​​de ambiente, inicialização de serviços, uso de contêineres Docker e testes.

Além disso, você aprenderá sobre comandos básicos de gerenciamento de projetos e práticas recomendadas para ajudar a manter um ambiente de desenvolvimento bom e funcional. Este documento é uma ótima referência para garantir que todos os aspectos técnicos do seu ambiente estejam devidamente configurados, para que você possa se concentrar no desenvolvimento da funcionalidade do seu projeto.
---

## Requisitos

- **Node.js**: [Instale aqui](https://nodejs.org/)
- **Git**: [Instale aqui](https://git-scm.com/)
- **Docker**(Olhar a documentação focada em Docker no repositório): [Instale aqui](https://www.docker.com/)

---
## Trabalhar em Conjunto
### 1. Docker Compose
```bash
services:
  # Backend 
  backend:
    build:
      context: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    command: npm run dev

  # Frontend 
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    stdin_open: true
    tty: true
    command: npm run dev
```

## Configuração do Backend

### 1. Clonar o Repositório
```bash
git clone <https://github.com/unb-mds/2024-2-SuaFinanca.gitO>
cd <2024-2-SuaFinancaD>
```

### 2. Instalar Dependências
No backend:
```bash
npm install
```
No frontend:
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie os arquivos .env e .env.local nas pastas do backend e do frontend, respectivamente, com as seguintes configurações:

Backend (.env):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Configuração do Banco de Dados com Prisma
Inicializar o Prisma:
```bash
npx prisma init
```
Criar e aplicar migrações:
```bash
npx prisma migrate dev --name init
```
Gerar os clientes do Prisma:
```bash
npx prisma generate
```

### 5. Subir Contêineres com Docker
Se desejar usar o Docker para o banco de dados, execute o seguinte comando para criar um contêiner PostgreSQL local:
```bash
docker run --name postgres -e POSTGRES_PASSWORD=senha -p 5432:5432 -d postgres
```
#### 5.1 Docker (backend)
1. Contâiner do backend separado 
```bash
FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
```

### 6. Executar Backend e Frontend Separadamente
Backend: Certifique-se de que o banco de dados está ativo e execute:
```bash
npm run dev
```
Frontend: No diretório do frontend, execute:
```bash
npm run dev
```

### 5. Executar o Servidor
```bash
npm run dev
```

---

## Ferramentas e Configurações do Backend

### 1. Vitest (Testes Unitários)
Já incluído no projeto. Para executar os testes unitários:
```bash
npm run test:unit
```

### 2. Jest e Supertest (Testes de Integração)
Para rodar os testes de integração:
```bash
npm run test:integration
```

### 3. Cypress (Testes End-to-End)
1. Inicie o servidor:
```bash
npm run dev
```
2. Execute o Cypress:
```bash
npx cypress open
```
---

## Configuração do Frontend

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo .env.local na raiz do projeto e defina as variáveis necessárias:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Executar o Frontend
```bash
npm run dev
```

### 4. Docker (frontend)
```bash
FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```
---

## Executando Todo o Projeto

### 1. Subir o Backend:
- Certifique-se de que o banco de dados está ativo.
- Execute:
```bash
npm run dev
```

### 2. Subir o Frontend:
- No diretório do frontend, execute:
```bash
npm run dev
```

Acesse a aplicação em http://localhost:3000.


---

## Estrutura de Scripts
| Comando                 | Descrição                                      |
|-------------------------|-----------------------------------------------|
| npm run dev           | Inicia o servidor em modo de desenvolvimento. |
| npm run build         | Cria o build de produção.                     |
| npm run test:unit     | Executa os testes unitários com Vitest.       |
| npm run test:integration | Executa os testes de integração com Jest e Supertest. |
| npm run test:e2e      | Executa os testes E2E com Cypress.            |

---

## Dicas Adicionais
- Gerenciamento de Dependências: Utilize npm ci para uma instalação mais controlada.
- Configuração de Banco de Dados: Utilize Docker para criar uma instância local rapidamente:
```bash
docker run --name postgres -e POSTGRES_PASSWORD=senha -p 5432:5432 -d postgres
```