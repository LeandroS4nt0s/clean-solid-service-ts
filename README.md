## ✨ Por Que Escolher Este Template?

1.  **Arquitetura Limpa (Clean Architecture)**
    A espinha dorsal deste boilerplate é a Clean Architecture, promovendo uma separação clara de responsabilidades entre as diversas camadas do seu sistema. Isso se traduz em:

    - **Escalabilidade Aprimorada:** A adição de novas funcionalidades, como a busca filtrada de faturas (`FindByFilterInvoiceUseCase`), é isolada e não interfere em outras partes do sistema, como a listagem de todas as faturas (`ListAllInvoicesController`).
    - **Manutenção Simplificada:** Alterações em uma camada, como a implementação do repositório de faturas (`InvoiceRepositoryImpl`), não afetam a lógica de negócios (`FindByFilterInvoiceUseCase`) ou a forma como os dados são apresentados na API (`FindByFilterInvoiceController`).
    - **Testabilidade Facilitada:** A separação de responsabilidades permite a criação de testes unitários focados em cada camada (Use Cases, Controllers, Repositórios) de forma independente.

2.  **Domain-Driven Design (DDD)**
    Ao adotar o DDD, isolamos as entidades (`InvoiceEntity`) e a lógica de negócios da infraestrutura e da apresentação. Isso proporciona:

    - **Modelos de Domínio Ricos:** A `InvoiceEntity` representa o conceito central de fatura no seu negócio, mantendo a lógica de negócios coesa e focada nesse domínio.
    - **Lógica de Negócios Clara:** Use Cases como `FindByFilterInvoiceUseCase` encapsulam a lógica específica para buscar faturas com base em critérios (`InvoiceFilterCriteria`), mantendo essa lógica separada de detalhes de infraestrutura (como o banco de dados).

3.  **Injeção de Dependências (tsyringe)**
    A biblioteca `tsyringe` é utilizada para gerenciar as dependências entre os componentes da sua aplicação, oferecendo:

    - **Gerenciamento Centralizado:** A configuração das dependências, como a injeção de `InvoiceRepositoryImpl` no `FindByFilterInvoiceUseCase`, é feita de forma centralizada no container (`infrastructure/container/`). Isso facilita a visualização e a manutenção das relações entre os componentes.
    - **Baixo Acoplamento:** A injeção de dependências através de interfaces (`InvoiceRepositoryInterface`) permite que você troque implementações (por exemplo, diferentes bancos de dados) sem alterar o código que depende dessas abstrações.

    ```typescript
    import { injectable, inject } from 'tsyringe'
    import { InvoiceRepositoryInterface } from '@domain/model/repositories/InvoIceRepository/InvoiceRepository'
    import { InvoiceEntity } from '@domain/model/entities/InvoiceEntity'
    import { FilterInvoicesDTO } from '@application/useCases/Invoice/dtos/InvoiceDto'
    import { InvoiceFilterCriteria } from '@domain/model/repositories/InvoIceRepository/criteria/InvoiceFilterCriteria'
    import { InvoiceRepositoryImpl } from '@infra/database/repositories/Invoice/RepositoryImpl'

    @injectable()
    export class FindByFilterInvoiceUseCase {
      constructor(@inject(InvoiceRepositoryImpl) private repository: InvoiceRepositoryInterface) {}

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
    Este boilerplate demonstra claramente a facilidade de trocar implementações, não apenas de bancos de dados, mas também de outros componentes:

    ### 🔄 Troca de Implementação de Banco de Dados

    A configuração do serviço de banco de dados (`DataBaseService`) no container (`infrastructure/container/index.ts`) permite alternar entre diferentes implementações (como `MySQLImplementation` e `PostgresImplementation`) com uma simples mudança na configuração. A camada de aplicação e domínio interagem com uma interface (`DataBaseInterface`), tornando a troca transparente. A existência de pastas separadas para implementações de MySQL e PostgreSQL (`@infra/database/implementation/mysql/`, `@infra/database/implementation/postgres/`) reforça essa flexibilidade.

    ```typescript
    // Exemplo de registro para MySQL em infrastructure/container/index.ts
    import { container } from 'tsyringe'
    import { MySQLImplementation } from '@infra/database/implementation/mysql/MySQLImplementation'
    import { DataBaseInterface } from '@infra/database/interface/DatabaseInterface'
    import { DataSource } from 'typeorm'

    container.registerSingleton<DataBaseInterface<DataSource>>(
      'DataBaseService',
      MySQLImplementation
    )
    ```

    ### 🔩 Troca de Repositórios

    A injeção da `InvoiceRepositoryInterface` no `FindByFilterInvoiceUseCase` permite que você utilize diferentes implementações de repositório (`InvoiceRepositoryImpl`) sem alterar a lógica do caso de uso. Isso seria útil, por exemplo, se você decidisse mudar a forma como os dados são persistidos (outro banco de dados, um serviço externo, etc.).

5.  **Tratamento de Erros Robusto e Centralizado**
    O tratamento de erros é cuidadosamente implementado para fornecer uma experiência de desenvolvimento mais suave e respostas consistentes para o cliente:

    - **`asyncHandler`:** Este wrapper (`@shared/wrappers/asyncHandler`) simplifica o tratamento de erros assíncronos em seus controllers (`FindByFilterInvoiceController`, `ListAllInvoicesController`). Ele elimina a necessidade de blocos `try/catch` repetitivos, permitindo que você se concentre na lógica principal da sua rota. Qualquer erro lançado dentro da função passada para `asyncHandler` será automaticamente passado para o middleware de erro.

      ```typescript
      // Exemplo de uso em InvoiceRoute.ts
      import { Router } from 'express'
      import { asyncHandler } from '@shared/wrappers/asyncHandler'
      import { ListAllInvoicesController } from '@presentation/http/modules/Invoice/ListAllInvoicesController'
      import { FindByFilterInvoiceController } from '@presentation/http/modules/Invoice/FindByFilterInvoiceController'
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

      export default InvoiceRoutes
      ```

    - **Middleware de Erro (`@shared/middlewares/errorMiddleware`)**: Este middleware centraliza a lógica de tratamento de erros para toda a aplicação. Ele captura exceções lançadas em qualquer lugar do seu código e formata uma resposta de erro consistente para o cliente. A existência de erros de domínio específicos (`@domain/model/erros/`) como `UnprocessableEntityError` permite um tratamento mais semântico dos erros. No caso do `FindByFilterInvoiceController`, se a validação dos parâmetros da query falhar (usando `FilterInvoicesSchema`), um `UnprocessableEntityError` é lançado, que será capturado e formatado pelo middleware de erro.

      ```typescript
      // Exemplo de uso no Server.ts
      import express, { Express } from 'express'
      // ... outras importações
      import { errorMiddleware } from '@shared/middlewares/errorMiddleware'

      class Server {
        // ... outras partes do servidor

        private setMiddlewares(): void {
          this.app.use(helmet())
          this.app.use(morgan('dev'))
          this.app.use(cors(appConfig.cors))
          this.app.use(express.json())
          this.app.use(errorMiddleware) // Middleware de erro
        }

        // ...
      }
      ```

6.  **Organizações de Donos de Bibliotecas Importantes**
    As bibliotecas mais importantes utilizadas neste template são pilares da comunidade JavaScript e TypeScript, mantidas por organizações e comunidades de código aberto com um histórico comprovado de estabilidade e suporte ativo:

    - **Node.js**: Desenvolvido e mantido pela Node.js Foundation, essencial para a execução do seu back-end JavaScript.
    - **TypeScript**: Criado e mantido pela Microsoft, adicionando tipagem estática e melhorando a segurança e a manutenibilidade do seu código.
    - **TypeORM**: Um ORM popular e robusto para Node.js, criado e mantido por uma comunidade ativa, facilitando a interação com diversos bancos de dados.
    - **tsyringe**: Uma biblioteca leve e focada em injeção de dependências para TypeScript, desenvolvida pela comunidade para promover a desacoplamento e a testabilidade.
    - **Zod**: Uma biblioteca de validação de esquemas poderosa e intuitiva, mantida por uma comunidade ativa, garantindo a integridade dos dados que sua API recebe (como demonstrado na validação do `FilterInvoicesDTO` no `FindByFilterInvoiceController`).
    - **Express**: O framework HTTP minimalista mais popular para Node.js, criado e mantido pela comunidade, oferecendo flexibilidade e uma vasta gama de middlewares.
    - **Helmet**: Um middleware de segurança essencial para aplicações Express, criado e mantido pela comunidade para proteger sua aplicação contra vulnerabilidades comuns.
    - **Morgan**: Uma biblioteca de logging HTTP padrão, mantida pela comunidade para facilitar o monitoramento e o debugging das requisições da sua aplicação.
    - **dotenv**: Uma ferramenta simples e amplamente utilizada para carregar variáveis de ambiente, mantida pela comunidade para uma configuração flexível da sua aplicação.

7.  **Tarefas de Inicialização e Finalização Controladas**
    A inclusão de tarefas de inicialização (`onStartupDataBaseTask`) e finalização (`onShutdownDataBaseTask`) demonstra uma preocupação com o ciclo de vida da sua aplicação:

    - **`onStartupDataBaseTask` (`@infra/services/internal/tasks/onStartup/onStartupDataBaseTask.ts`)**: Esta função garante que a conexão com o banco de dados seja estabelecida quando a aplicação inicia. A resolução do `DataBaseService` através do container (`container.resolve<DataBaseInterface<DataSource>>('DataBaseService')`) garante que a implementação configurada (MySQL ou PostgreSQL) seja utilizada.
    - **`onShutdownDataBaseTask` (`@infra/services/internal/tasks/onShutdown/onShutdownDataBaseTask.ts`)**: Esta função permite que você execute tarefas de limpeza importantes quando a aplicação está sendo desligada, como fechar a conexão com o banco de dados de forma segura, evitando perda de dados ou conexões pendentes. A configuração dos listeners de sinal (`process.on('SIGINT', shutdown)`, `process.on('SIGTERM', shutdown)`) garante que essa tarefa seja executada graciosamente.

    ```typescript
    // @infra/services/internal/tasks/onStartup/onStartupDataBaseTask.ts
    import { DataBaseInterface } from '@infra/database/interface/DatabaseInterface'
    import { container } from 'tsyringe'
    import { DataSource } from 'typeorm'

    export async function onStartupDataBaseTask() {
      const DataBaseService = container.resolve<DataBaseInterface<DataSource>>('DataBaseService')
      await DataBaseService.start()
    }

    // @presentation/Server.ts (trecho com os listeners de shutdown)
    let isShuttingDown = false
    const shutdown = async () => {
      if (isShuttingDown) return
      isShuttingDown = true
      try {
        logger.info('🔥 Gracefully shutting down...')
        await onShutdownDataBaseTask()
      } catch (error) {
        logger.error('❌ Error during shutdown:', error)
      } finally {
        process.exit(0)
      }
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
    ```
