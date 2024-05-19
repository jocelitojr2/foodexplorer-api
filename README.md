
# FoodExplorer - API

A aplicação que desenvolveremos é um cardápio digital para um restaurante fictício, conhecido como foodExplorer.

- [Link do deploy no RENDER](https://foodexplorer-api-3hq3.onrender.com)
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/jocelitojr2/foodexplorer-api.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

#### Variáveis de Ambiente (Não é obrigatório)

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`AUTH_SECRET`

`PORT`

Inicie o servidor

```bash
  npm run dev
```

Contas para utilizar.

```bash
  Cliente ⬇
  email: cliente@email.com
  senha: 123

  Administrador ⬇
  email: admin@email.com
  senha: 123
```




## Documentação da API
#### Estrutura do banco.
![Banco de dados](https://drawsql-media.s3-us-east-2.amazonaws.com/screenshots/6501243/conversions/1715105323-421819-thumbnail.jpg)

# Roles
#### Cria um permissão de usuário.
```http
  POST /api/roles
```
Body em JSON
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome da role |
| `description` | `string` | **Obrigatório**. descrição da role |

# Categories

#### Retorna todas as categorias
```http
  GET /api/categories
```

#### Cria uma categoria
```http
  POST /api/categories
```

#### Edita uma categoria
```http
  PUT /api/categories/${id}
```

Body em JSON
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome da Categoria |
| `description` | `string` | **Obrigatório**. descrição da Categoria |

# Users

#### Cria um usuário.
```http
  POST /api/users/
```

Body em JSON
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usuário |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |

#### Atualiza dados de um usuário.
```http
  PUT /api/users/
```
Body em JSON
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usuário |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |
| `old_password` | `string` | **Opcional**. Senha do usuário (Obrigatório caso queira alterar a senha) |

#### Atualiza imagem do usuário (Não utilizado no momento).
```http
  PATCH /api/users/avatar
```
Body em Multipart From
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `avatar` | `file` | **Obrigatório**. Arquivo de imagem |

# Sessions

#### Cria uma sessão de usuário.
```http
  POST /api/sessions
```

Body em JSON
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |

# Users Roles

#### Retorna dados da permissão do usuário.
```http
  GET /api/usersRoles/${user_id}
```

#### Vincula um usuário a uma permissão.
```http
  POST /api/usersRoles
```
  Body em JSON
  | Parâmetro   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `role_id` | `number` | **Obrigatório**. Id da permissão |
  | `user_id` | `string` | **Obrigatório**. Id do usuário |

#### Atualiza permissão do usuário .
```http
  PUT /api/usersRoles/${user_id}
```
   Body em JSON
  | Parâmetro   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `role_id` | `number` | **Obrigatório**. Id da permissão |


# Products

#### Retorna todos os produtos.
```http
  GET /api/products
```

#### Cria um produto.
```http
  POST /api/products
```

#### Edita um produto.
```http
  PUT /api/products/${product_id}
```
  Body em Multipart Form
  | Parâmetro   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `name` | `number` | **Obrigatório**. Nome do produto |
  | `description` | `string` | **Obrigatório**. Descrição do produto |
  | `image` | `file` | **Obrigatório**. Imagem para o produto |
  | `price` | `number` | **Obrigatório**. Preço para o produto (Utilizar ponto "." ao inves de virgula) |
  | `ingredients` | `Array` | **Obrigatório**. Array de ingredientes |
  | `category_id` | `number` | **Obrigatório**. Id da categoria para o produto |

#### Edita imagem do produto.
```http
  PUT /api/products/image/${product_id}
```
  Body em Multipart Form
  | Parâmetro   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `image` | `file` | **Obrigatório**. Imagem para o produto |


# Files

#### Retorna imagem dos produtos.
```http
  GET /api/files/${url_da_imagem}
```


## Dependências do Projeto.

- [Bcryptjs](https://styled-components.com/docs/basics#installation): Utilizado para hash de senhas.
- [Express](https://axios-http.com/docs/intro): Framework para Node.js.
- [Express-async-errors](https://v5.reactrouter.com/web/guides/quick-start): Tratamento de erros assíncronos no Express.
- [Sqlite - Sqlite3](https://www.sqlite.org/docs.html): Banco de dados SQLite.
- [Knex](http://knexjs.org/#Installation-node): Query builder para SQL.
- [Nodemon - Dev. dependência](https://nodemon.io/): Ferramenta para desenvolvimento que reinicia automaticamente o servidor.
- [JWT: jsonwebtoken](https://jwt.io/): Utilizado para autenticação baseada em tokens.
- [Multer](https://www.npmjs.com/package/multer): Middleware para manipulação de arquivos multipart/form-data.
- [CORS](https://www.npmjs.com/package/cors): Middleware para habilitar CORS.
- [Jest](https://jestjs.io/docs/getting-started): Framework de testes em JavaScript.
- [Cookie parser](https://expressjs.com/en/resources/middleware/cookie-parser.html): Middleware para parsear cookies.
- [dotenv](https://www.npmjs.com/package/dotenv): Carregar variáveis de ambiente de um arquivo .env.
- [PM2](https://pm2.keymetrics.io/): Gerenciador de processos para Node.js.

