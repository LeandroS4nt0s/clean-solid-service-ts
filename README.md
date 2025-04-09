Boilerplate Node TypeScript - Clean Architecture e DDD

Este boilerplate foi criado para fornecer uma base sólida e escalável para o desenvolvimento de aplicações back-end com Node.js, TypeScript, Clean Architecture e Domain-Driven Design (DDD). Ele oferece uma estrutura modular e testável, permitindo que você construa sistemas facilmente manuteníveis, seguros e escaláveis, enquanto foca nas regras de negócio.

Por Que Usar Este Template?

1. Arquitetura Limpa (Clean Architecture)
   A estrutura segue os princípios de Clean Architecture, garantindo uma clara separação de responsabilidades entre as diferentes camadas do sistema. Isso significa que sua aplicação é:

- Escalável: Você pode adicionar novas funcionalidades de forma modular, sem comprometer o código existente.
- Fácil de manter: Alterações em uma camada não afetam as outras camadas, facilitando a manutenção a longo prazo.
- Fácil de testar: A separação das camadas facilita a criação de testes unitários e de integração.

2. Domain-Driven Design (DDD)
   Com o DDD, as entidades e a lógica de negócios estão isoladas da infraestrutura e da interface. Isso permite que você:

- Crie modelos de domínio ricos, facilitando o entendimento do negócio e a colaboração entre equipes.
- Mantenha a lógica de negócios isolada e centrada em torno de entidades, tornando o código mais coeso.

3. Injeção de Dependências
   A injeção de dependências, utilizando a biblioteca tsyringe, permite:

- Facilidade para gerenciar dependências: O gerenciamento de dependências é feito de maneira centralizada, facilitando a testabilidade e a manutenção do código.
- Adoção de boas práticas: A separação de responsabilidades é promovida pela injeção de dependências, reduzindo o acoplamento entre as classes.

Exemplo:
@injectable()
export class FindByFilterInvoiceUseCase {
constructor(@inject(InvoiceRepositoryImpl) private repository: InvoiceRepositoryInterface) {}
// Lógica de negócios
}

4. Facilidade de Troca de Implementações

Não só a troca do banco de dados é facilitada, mas também outras implementações, como a troca de repositórios, serviços ou validações.

Troca de Implementação de Banco de Dados
A estrutura foi projetada de maneira que a troca entre as implementações de banco de dados (como MySQL e PostgreSQL) é simples. O código está organizado de forma modular, e a troca entre as implementações requer apenas uma pequena modificação na configuração do container de dependências.

Exemplo de implementação para MySQL:
import { container } from 'tsyringe'
import { MySQLImplementation } from '@infra/database/implementation'

container.registerSingleton<DataBaseInterface<unknown>>('DataBaseService', MySQLImplementation)

Exemplo de implementação para PostgreSQL:
import { container } from 'tsyringe'
import { PostgresImplementation } from '@infra/database/implementation'

container.registerSingleton<DataBaseInterface<unknown>>('DataBaseService', PostgresImplementation)

Troca de Repositórios
A flexibilidade também se estende aos repositórios. O repositório InvoiceRepositoryImpl poderia ser facilmente trocado por outro repositório sem afetar a lógica de negócio ou a API. A camada de infraestrutura é desacoplada da camada de domínio, o que permite que você altere as implementações de persistência sem impacto nas camadas superiores.

Exemplo:

// Troca de Repositório de Fatura
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

5. Tratamento de Erros

O tratamento de erros foi simplificado com a implementação do asyncHandler e o middleware de erro.

O **asyncHandler** ajuda a tratar erros assíncronos de forma centralizada, evitando a repetição de blocos try/catch em cada rota.

Exemplo de uso do asyncHandler:
import { asyncHandler } from '@shared/wrappers/asyncHandler'

InvoiceRoutes.get(
'/',
asyncHandler(listAllInvoicesController.handle.bind(listAllInvoicesController))
)
InvoiceRoutes.get(
'/filter',
asyncHandler(findByFilterInvoiceController.handle.bind(findByFilterInvoiceController))
)

O **middleware de erro** centraliza o tratamento de erros, permitindo que você capture exceções e retorne respostas adequadas ao cliente.

Exemplo de uso do middleware de erro:
import { errorMiddleware } from '@shared/middlewares/errorMiddleware'

class Server {
private app: Express
private port: number

constructor() {
this.app = express()
this.port = env.PORT
}

private setMiddlewares(): void {
this.app.use(helmet())
this.app.use(morgan('dev'))
this.app.use(cors(appConfig.cors))
this.app.use(express.json())
this.app.use(errorMiddleware) // Middleware de erro
}
}

6. Organizações de Donos de Bibliotecas Importantes

As bibliotecas mais importantes utilizadas neste template têm donos relevantes que contribuem para a comunidade de código aberto:

- **Node.js**: Desenvolvido e mantido pela Node.js Foundation.
- **TypeScript**: Criado e mantido pela Microsoft.
- **TypeORM**: Criado e mantido pela comunidade de código aberto.
- **tsyringe**: Desenvolvido pela comunidade, com foco em injeção de dependências para TypeScript.
- **Zod**: Biblioteca para validação de esquemas, mantida por uma comunidade ativa.
- **Express**: Criado e mantido pela comunidade, utilizado como framework HTTP minimalista.
- **Helmet**: Criado e mantido pela comunidade para segurança em aplicações Express.
- **Morgan**: Biblioteca de logging HTTP mantida pela comunidade.
- **dotenv**: Utilizado para carregar variáveis de ambiente, mantido pela comunidade.
