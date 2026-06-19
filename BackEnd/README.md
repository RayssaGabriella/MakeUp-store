# MakeUp Store - Backend (MariaDB)

API REST em Node.js + Express para o frontend MakeUp Store, usando **MariaDB** como banco de dados.

## Estrutura

```
makeup-backend-mysql/
├── sql/
│   └── schema.sql             # Script para criar o banco e a tabela
├── src/
│   ├── config/
│   │   └── database.js        # Pool de conexão com o MariaDB
│   ├── models/
│   │   └── MakeupModel.js     # Queries (CRUD) no banco
│   ├── controllers/
│   │   └── MakeupController.js # Lógica das rotas
│   ├── routes/
│   │   └── makeupRoutes.js    # Definição das rotas /makeups
│   └── server.js              # Arquivo principal (Express app)
├── package.json
├── .env.example
└── .gitignore
```

## 1. Criar o banco e a tabela

Rode o script `sql/schema.sql` no seu MariaDB:

```bash
mysql -u seu_usuario -p < sql/schema.sql
```

Isso cria o banco `makeup_store` e a tabela `makeups`.

## 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e edite com suas credenciais:

```bash
cp .env.example .env
```

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=makeup_store

PORT=3001
```

## 3. Instalar dependências e rodar

```bash
npm install
npm run dev     # com nodemon (recarrega automático)
# ou
npm start        # produção simples
```

O servidor sobe em `http://localhost:3001`.

## Rotas disponíveis

| Método | Rota           | Descrição                  |
|--------|----------------|-----------------------------|
| GET    | /makeups       | Lista todas as maquiagens  |
| GET    | /makeups/:id   | Busca uma maquiagem por id |
| POST   | /makeups       | Cria uma nova maquiagem    |
| PUT    | /makeups/:id   | Atualiza uma maquiagem     |
| DELETE | /makeups/:id   | Remove uma maquiagem       |

### Exemplo de corpo (POST/PUT)

```json
{
  "nome": "Base Líquida",
  "marca": "Vult",
  "categoria": "Base",
  "cor": "Bege Claro",
  "preco": 39.9
}
```

## Integrando com o frontend (Home.tsx)

Mesma integração da versão SQLite — troque as funções de `localStorage` por `fetch` apontando para `http://localhost:3001/makeups`. Veja exemplos completos no README da versão anterior ou peça que eu já edite o `Home.tsx` direto.

CORS já está liberado no backend, então funciona direto com o Vite (porta padrão 5173).
