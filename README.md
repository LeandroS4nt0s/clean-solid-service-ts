
# Boilerplate - Node.js TypeScript - Clean Architecture

Este é um boilerplate de projeto Node.js utilizando TypeScript e seguindo o padrão Clean Architecture. Ele oferece uma estrutura organizada e escalável para construção de aplicações de back-end, com foco em manter um código bem estruturado, facilmente testável e de fácil manutenção.

## Tecnologias e Dependências

- Node.js com Express: Framework de servidor HTTP.
- TypeScript: Linguagem baseada em JavaScript, trazendo tipagem estática para melhorar a qualidade do código.
- TypeORM: ORM para trabalhar com bancos de dados, neste caso com suporte a MySQL.
- tsyringe: Injeção de dependências para gerenciar a criação e o ciclo de vida dos objetos.
- Zod: Biblioteca para validação de dados com tipagem estática.
- Helmet: Middleware de segurança para proteger a aplicação.
- Morgan: Middleware de logging HTTP.
- Cors: Middleware para configurar políticas de CORS.
- dotenv: Carregamento das variáveis de ambiente de um arquivo .env.

## Estrutura do Projeto

A estrutura de diretórios do projeto é organizada da seguinte maneira:

/src
  ├── /config               # Configurações de ambiente e variáveis
  ├── /domain               # Entidades e lógica de negócios
  ├── /infra                # Implementações de infraestrutura (ex: banco de dados, serviços externos)
  ├── /presentation         # Controladores e rotas de API
  ├── /application          # Casos de uso e lógica de aplicação
  ├── /shared               # Utilitários e middlewares compartilhados
  └── /utils                # Funções e helpers utilitários

## Funcionalidades

1. Servidor Express: O servidor é configurado com segurança e logging através dos middlewares helmet, morgan, cors, entre outros.
2. Banco de Dados MySQL: A conexão com o banco de dados MySQL é feita de forma automática e robusta. Se o banco não existir, ele será criado. A conexão é feita utilizando o TypeORM.
3. Injeção de Dependências: Utiliza o tsyringe para garantir a injeção de dependências nas classes e serviços, facilitando testes e organização.
4. Validação de Dados com Zod: A entrada de dados via parâmetros de query e corpo das requisições é validada com Zod.
5. Estrutura de Casos de Uso: A lógica de negócios e os casos de uso estão separados de forma a manter a aplicação organizada e de fácil manutenção.

## Como Rodar o Projeto

1. Clone o repositório:
    git clone https://github.com/seu-usuario/nome-do-repositorio.git

2. Navegue até o diretório do projeto:
    cd nome-do-repositorio

3. Instale as dependências:
    npm install

4. Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias. Exemplo:
    NODE_ENV=development
    PORT=3000
    DB_CLIENT=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=root
    DB_NAME=mydb
    CORS_ORIGIN=http://localhost:8080

5. Execute o projeto:
    npm run dev

6. O servidor estará rodando no endereço http://localhost:3000.

## Arquitetura

Este boilerplate segue os princípios da Clean Architecture, onde temos uma separação clara entre as camadas da aplicação:

- **Presentation Layer**: Controladores e rotas, como FindByFilterInvoiceController, recebem e processam as requisições HTTP.
- **Application Layer**: Casos de uso, como FindByFilterInvoiceUseCase, contêm a lógica de aplicação e orquestram as interações com o domínio.
- **Domain Layer**: Entidades como InvoiceEntity, que são a representação central do negócio, e interfaces de repositório.
- **Infrastructure Layer**: Implementações específicas de infraestrutura, como o acesso a dados utilizando o MySQLImplementation e InvoiceRepositoryImpl.

## Como Adicionar Novas Funcionalidades

Para adicionar novas funcionalidades à aplicação, siga este fluxo:

1. Crie um Caso de Uso: Caso o requisito envolva uma nova lógica de aplicação, crie um novo caso de uso na camada application.
2. Crie uma Entidade de Domínio: Se for necessário modelar novas informações, crie uma nova entidade de domínio dentro da camada domain.
3. Crie um Repositório: Se você precisa interagir com o banco de dados ou outros sistemas, crie um novo repositório na camada infra.
4. Crie um Controlador: Para interagir com os casos de uso via API, crie um novo controlador na camada presentation.
5. Crie as Validações: Se necessário, crie novos schemas de validação usando o Zod para validar dados de entrada.

## Exemplos de Rotas

Abaixo está um exemplo de como as rotas são definidas no projeto:

```javascript
import InvoiceRoutes from '@presentation/http/modules/Invoice/InvoiceRoute'
import { Router } from 'express'

const AppRoutes = Router()
AppRoutes.use('/invoices', [InvoiceRoutes])

export { AppRoutes }
```

## Estratégia de Inicialização e Desligamento

- Inicialização: Durante a inicialização do servidor, a aplicação conecta-se ao banco de dados e realiza qualquer tarefa de setup necessária.
- Desligamento: A aplicação realiza uma desconexão graciosa do banco de dados quando o servidor é desligado (SIGINT, SIGTERM).

## Testes

Os testes unitários e de integração podem ser adicionados facilmente devido à separação clara de responsabilidades nas camadas do sistema.

- Para realizar os testes, você pode criar testes para os casos de uso, testes para os controladores e testes para as entidades.
  
  Recomendação: Utilize frameworks como Jest para facilitar a escrita e execução de testes.

---

## Contribuindo

1. Faça um fork deste repositório.
2. Crie uma branch para a sua feature (git checkout -b minha-feature).
3. Faça as alterações necessárias e envie um pull request.

---

## Licença

Este projeto está licenciado sob a MIT License.

---

Happy coding! 😎
