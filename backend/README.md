# Backend - Sua Finança

## Descrição
Este é o backend do projeto "Sua Finança", uma aplicação para gerenciamento financeiro. O backend é construído utilizando Node.js, Express, Prisma e TypeScript, oferecendo uma API RESTful para o frontend consumir.

## Requisitos
- **Node.js**: [Instale aqui](https://nodejs.org/)
- **Git**: [Instale aqui](https://git-scm.com/)
- **Docker**: [Instale aqui](https://www.docker.com/)

## Configuração do Ambiente

### 1. Clonar o Repositório
```bash
git clone https://github.com/unb-mds/2024-2-SuaFinanca.git
cd 2024-2-SuaFinanca/backend
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do diretório 

backend

 com as seguintes configurações:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
JWT_SECRET="sua_chave_secreta"
PORT=3000
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

### 6. Executar o Servidor
Certifique-se de que o banco de dados está ativo e execute:
```bash
npm run dev
```

## Scripts Disponíveis
| Comando                 | Descrição                                      |
|-------------------------|-----------------------------------------------|
| `npm run dev`           | Inicia o servidor em modo de desenvolvimento. |
| `npm run build`         | Cria o build de produção.                     |
| `npm run test:unit`     | Executa os testes unitários com Vitest.       |

## Ferramentas e Tecnologias
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **Prisma**: ORM para Node.js.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Vitest**: Ferramenta de testes unitários.

## Estrutura do Projeto
```
backend/
├── .editorconfig
├── .env
├── .env.local
├── .gitignore
├── .prettierrc.json
├── Dockerfile
├── eslint.config.mjs
├── http/
├── package.json
├── prisma/
├── src/
├── test/
├── tsconfig.json
└── vitest.config.ts
```

## Contribuição
Para contribuir com este projeto, por favor leia o CONTRIBUTING.md.

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.