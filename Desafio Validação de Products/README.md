# DDD

## Preparação do ambiente

- nodejs deve estar instalado

- npm i typescript --save-dev
- npx tsc --init

- Em tsconfig.json: 
    "incremental": true,
    "outDir": "./dist",
    "strict": true,
  No final do arquivo:
    },
    "include": [
      "src/**/**.ts"
    ],
  } // fim do arquivo

- npm i tslint --save-dev
- npx tslint --init

- npm i -D jest @types/jest ts-node --save-dev
- npm i -D @swc/jest @swc/cli @swc/core
- npx jest --init

### Adicionar em jest.config.ts:
transform: {
   "^.+\.(t|j)sx?$": ["@swc/jest"],
 },

### Comando para executar os testes:
- npm test

### Forçar verificação de sintaxe:
- node_modules/.bin/tsc --noEmit

### Configurando o sequelize
- npm install sequelize reflect-metadata sequelize-typescript
- npm install sqlite3

### Importante: 
 É preciso adicionar o arquivo .swcrc na raiz do projeto para que o compilador interprete corretamente os decoradores do sequelize.

### Preparação do ambiente para camada de APIs:
Teremos que instalar alguns pacotes:
- npm i express @types/express dotenv
- npm i nodemon //ajuda a testar as apis

Em package.json -> scripts:
"tsc": "tsc",
"dev": "nodemon src/infrastructure/api/server.ts"

Agora para executar o servidor basta digitar no terminal:
- npm run dev

### Instalação de lib para testes E2E
- npm i -D supertest @types/supertest //consegue chamar a instância do express

### Trabalhando com interfaces de validação
Vamos usar uma biblioteca do typescript chamada yup. Para isso, preparamos o ambiente:
- npm install -S yup