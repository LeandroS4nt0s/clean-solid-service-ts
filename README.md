# 🚀 Boilerplate Node.js TypeScript - Clean Architecture & DDD

Este boilerplate foi cuidadosamente estruturado para fornecer uma base sólida e altamente escalável para o desenvolvimento de aplicações back-end robustas com Node.js e TypeScript, adotando os princípios da Clean Architecture e do Domain-Driven Design (DDD). Ele oferece uma organização modular e totalmente testável, permitindo que você construa sistemas manuteníveis, seguros e com foco total nas regras de negócio.

## ✨ Por Que Escolher Este Template?

1.  **Arquitetura Limpa (Clean Architecture)**
    A espinha dorsal deste boilerplate é a Clean Architecture, que promove uma separação clara de responsabilidades entre as diversas camadas do seu sistema. Os benefícios são evidentes:

    - **Escalabilidade:** Adicione novas funcionalidades de forma isolada, sem impactar o código existente.
    - **Manutenibilidade:** Altere componentes específicos sem afetar outras partes do sistema, simplificando a manutenção a longo prazo.
    - **Testabilidade:** A separação de camadas facilita a criação de testes unitários e de integração eficazes.

2.  **Domain-Driven Design (DDD)**
    Ao adotar o DDD, isolamos as entidades e a lógica de negócios da infraestrutura e da interface do usuário. Isso capacita você a:

    - **Modelos de Domínio Ricos:** Crie modelos que representam fielmente o negócio, facilitando o entendimento e a colaboração entre equipes.
    - **Lógica de Negócios Coesa:** Mantenha a lógica centralizada nas entidades, resultando em um código mais organizado e expressivo.

3.  **Injeção de Dependências (tsyringe)**
    A biblioteca `tsyringe` simplifica o gerenciamento de dependências, oferecendo:

    - **Gerenciamento Centralizado:** Facilidade para declarar e resolver dependências, melhorando a testabilidade e a manutenção.
    - **Boas Práticas:** Fomenta a separação de responsabilidades e reduz o acoplamento entre classes.

    ```typescript
    import { injectable, inject } from 'tsyringe'
    import { InvoiceRepositoryInterface } from '@domain/repositories/InvoiceRepositoryInterface'
    import { InvoiceEntity } from '@domain/entities/InvoiceEntity'
    import { FilterInvoicesDTO } from '@application/dtos/FilterInvoicesDTO'
    import { InvoiceFilterCriteria } from '@domain/repositories/criteria/InvoiceFilterCriteria'

    @injectable()
    export class FindByFilterInvoiceUseCase {
      constructor(@inject('InvoiceRepository') private repository: InvoiceRepositoryInterface) {}

      async execute(dto: FilterInvoicesDTO): Promise<InvoiceEntity[]> {
        const criteria: InvoiceFilterCriteria = {
          referenceMonth: dto.referenceMonth,
          customerNumber: dto.customerNumber,
        }
        return this.repository.findByFilters(criteria)
      }
    }
    ```

4.  **Flexibilidade na Troca de Implementações**
    Este boilerplate vai além da simples troca de bancos de dados, facilitando a substituição de repositórios, serviços e validações com mínimo esforço.

    ### 🔄 Troca de Implementação de Banco de Dados

    A arquitetura modular permite a substituição de implementações de banco de dados (como MySQL e PostgreSQL) de forma transparente. A alteração se resume a uma pequena modificação na configuração do container de dependências.

    **Exemplo para MySQL:**

    ```typescript
    import { container } from 'tsyringe'
    import { MySQLImplementation } from '@infra/database/implementations/MySQLImplementation'
    import { DataBaseInterface } from '@infra/database/DataBaseInterface'

    container.registerSingleton<DataBaseInterface>('DataBaseService', MySQLImplementation)
    ```

    **Exemplo para PostgreSQL:**

    ```typescript
    import { container } from 'tsyringe'
    import { PostgresImplementation } from '@infra/database/implementations/PostgresImplementation'
    import { DataBaseInterface } from '@infra/database/DataBaseInterface'

    container.registerSingleton<DataBaseInterface>('DataBaseService', PostgresImplementation)
    ```

    ### 🔩 Troca de Repositórios

    A mesma flexibilidade se aplica aos repositórios. A `InvoiceRepositoryImpl` pode ser facilmente substituída por outra implementação sem afetar a lógica de negócios ou a camada de API, graças ao desacoplamento entre as camadas de domínio e infraestrutura.

    **Exemplo:**

    ```typescript
    import { injectable, inject } from 'tsyringe'
    import { InvoiceRepositoryInterface } from '@domain/repositories/InvoiceRepositoryInterface'
    import { InvoiceEntity } from '@domain/entities/InvoiceEntity'
    import { FilterInvoicesDTO } from '@application/dtos/FilterInvoicesDTO'
    import { InvoiceFilterCriteria } from '@domain/repositories/criteria/InvoiceFilterCriteria'

    @injectable()
    export class FindByFilterInvoiceUseCase {
      constructor(@inject('InvoiceRepository') private repository: InvoiceRepositoryInterface) {}

      async execute(dto: FilterInvoicesDTO): Promise<InvoiceEntity[]> {
        const criteria: InvoiceFilterCriteria = {
          referenceMonth: dto.referenceMonth,
          customerNumber: dto.customerNumber,
        }
        return this.repository.findByFilters(criteria)
      }
    }
    ```

5.  **Tratamento de Erros Simplificado**
    O tratamento de erros é facilitado pela integração do `asyncHandler` e um middleware de erro dedicado.

    O **`asyncHandler`** simplifica o tratamento de erros assíncronos, eliminando a necessidade de blocos `try/catch` repetitivos em suas rotas.

    **Exemplo de uso:**

    ```typescript
    import { Router } from 'express'
    import { asyncHandler } from '@shared/wrappers/asyncHandler'
    import { ListAllInvoicesController } from '@infra/http/controllers/ListAllInvoicesController'
    import { FindByFilterInvoiceController } from '@infra/http/controllers/FindByFilterInvoiceController'
    import { container } from 'tsyringe'

    const InvoiceRoutes = Router()
    const listAllInvoicesController = container.resolve(ListAllInvoicesController)
    const findByFilterInvoiceController = container.resolve(FindByFilterInvoiceController)

    InvoiceRoutes.get(
      '/',
      asyncHandler(listAllInvoicesController.handle.bind(listAllInvoicesController))
    )
    InvoiceRoutes.get(
      '/filter',
      asyncHandler(findByFilterInvoiceController.handle.bind(findByFilterInvoiceController))
    )

    export { InvoiceRoutes }
    ```

    O **middleware de erro** centraliza a captura e o tratamento de exceções, permitindo respostas consistentes e informativas para o cliente.

    **Exemplo de uso:**

    ```typescript
    import express, { Express } from 'express'
    import helmet from 'helmet'
    import morgan from 'morgan'
    import cors from 'cors'
    import { errorMiddleware } from '@shared/middlewares/errorMiddleware'
    import { AppConfig } from '@config/app'
    import { EnvironmentConfig } from '@config/environment'

    class Server {
      private app: Express
      private port: number

      constructor() {
        this.app = express()
        this.port = EnvironmentConfig.PORT
      }

      private setMiddlewares(): void {
        this.app.use(helmet())
        this.app.use(morgan('dev'))
        this.app.use(cors(AppConfig.cors))
        this.app.use(express.json())
        this.app.use(errorMiddleware) // Middleware de erro
      }

      // ... outras configurações do servidor
    }
    ```

6.  **Baseado em Bibliotecas Robustas e Mantidas Ativamente**
    As principais bibliotecas utilizadas neste template são mantidas por organizações e comunidades de código aberto confiáveis:

    - **Node.js:** Desenvolvido e mantido pela Node.js Foundation.
    - **TypeScript:** Criado e mantido pela Microsoft.
    - **TypeORM:** Criado e mantido por uma comunidade ativa.
    - **tsyringe:** Desenvolvido pela comunidade, com foco em injeção de dependências para TypeScript.
    - **Zod:** Biblioteca de validação de esquemas mantida por uma comunidade ativa.
    - **Express:** Criado e mantido pela comunidade, um framework HTTP minimalista e amplamente utilizado.
    - **Helmet:** Mantido pela comunidade para segurança em aplicações Express.
    - **Morgan:** Biblioteca de logging HTTP mantida pela comunidade.
    - **dotenv:** Utilizado para carregar variáveis de ambiente, mantido pela comunidade.
