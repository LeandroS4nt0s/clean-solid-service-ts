# Boilerplate - Node.js TypeScript com Clean Architecture e DDD

Este boilerplate foi criado para fornecer uma base sólida para o desenvolvimento de aplicações de back-end utilizando **Node.js**, **TypeScript**, **Clean Architecture** e **Domain-Driven Design (DDD)**. A estrutura organizada, escalável e modular facilita a criação de sistemas bem estruturados, facilmente testáveis e de fácil manutenção.

## 🚀 Tecnologias e Dependências

- **Node.js com Express**: Framework de servidor HTTP rápido e minimalista.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript, aumentando a segurança e a legibilidade do código.
- **TypeORM**: ORM que facilita a interação com bancos de dados, como MySQL.
- **tsyringe**: Biblioteca para injeção de dependências, promovendo a separação de responsabilidades.
- **Zod**: Ferramenta para validação de dados com tipagem estática.
- **Helmet**: Middleware para segurança da aplicação.
- **Morgan**: Middleware para registro de logs HTTP.
- **Cors**: Middleware para configurar políticas de CORS.
- **dotenv**: Carregamento de variáveis de ambiente de um arquivo `.env`.

## 📂 Estrutura do Projeto

A estrutura do projeto segue uma organização modular, com camadas bem definidas, baseada em **Clean Architecture** e **DDD**:

```plaintext
/src
  ├── /config               # Configurações gerais do projeto
  ├── /domain               # Entidades, repositórios e lógica de negócios
  ├── /infra                # Implementações de infraestrutura (banco de dados, serviços externos)
  ├── /presentation         # Controladores e rotas de API
  ├── /application          # Casos de uso e lógica de aplicação
  ├── /shared               # Utilitários e middlewares compartilhados
  └── /utils                # Funções auxiliares
```

## 🛠️ Funcionalidades Principais

- **Servidor Express**: Configuração robusta com segurança e logging, utilizando middlewares como Helmet, Morgan e CORS.
- **Banco de Dados MySQL**: Conexão automática com MySQL via TypeORM. Caso o banco não exista, ele será criado.
- **Injeção de Dependências**: Uso de `tsyringe` para gerenciar a criação de instâncias e facilitar testes.
- **Validação de Dados com Zod**: Validação de entrada de dados para garantir consistência e segurança nas requisições.
- **DDD e Clean Architecture**: Camadas bem separadas (presentation, application, domain, infrastructure) para manter o código organizado, modular e fácil de escalar.

## ⚙️ Como Rodar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias. Exemplo:

   ```plaintext
   NODE_ENV=development
   PORT=3000
   DB_CLIENT=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=mydb
   CORS_ORIGIN=http://localhost:8080
   ```

5. Execute o projeto:

   ```bash
   npm run dev
   ```

6. O servidor estará disponível em `http://localhost:3000`.

## 🏗️ Arquitetura

Este boilerplate segue a arquitetura **Clean Architecture** com os seguintes princípios:

- **Presentation Layer**: Responsável por interagir com o mundo externo (controladores e rotas).
- **Application Layer**: Contém a lógica da aplicação e casos de uso.
- **Domain Layer**: Define as entidades e regras de negócios do sistema.
- **Infrastructure Layer**: Implementação de detalhes, como acesso a banco de dados e serviços externos.

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
