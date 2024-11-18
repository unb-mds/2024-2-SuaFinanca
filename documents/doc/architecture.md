# Documentação da Arquitetura do Sistema

## 1. Visão Geral da Arquitetura

### 1.1. Introdução

Este documento descreve a arquitetura de um sistema projetado para auxiliar indivíduos no gerenciamento de suas finanças pessoais. O sistema se concentra em fornecer uma plataforma onde os usuários possam registrar suas receitas e despesas, obter uma visão clara de seu saldo disponível e identificar padrões de gastos.

### 1.2. Objetivos

- Facilitar o monitoramento de transações financeiras pessoais.

- Oferecer insights sobre hábitos financeiros através de relatórios e análises.

- Garantir a segurança e a privacidade das informações financeiras dos usuários.

### 1.3. Princípios da Arquitetura

A arquitetura do sistema garante que os componentes centrais do domínio sejam independentes de frameworks, facilitando testes, manutenção e evolução contínua. Isso é alcançado através da clara separação de responsabilidades em camadas distintas.

## 2. Diagrama de Alto Nível

<div style="text-align: center;">
    <img src="../img/Diagrama de Alto Nível.svg" alt="Diagrama de Alto Nível" width="350">
</div>

## 3. Detalhamento das Camadas

### 3.1. Entidades

- **Descrição Detalhada**: A camada de Entidades representa os conceitos centrais e tem as regras de negócio mais fundamentais do domínio. Em uma aplicação de controle financeiro pessoal, isso incluiria conceitos como "Usuário" e "Transação".
- **Responsabilidades**:
  - Modelar os dados essenciais do sistema, garantindo que todas as regras de negócio associadas a esses dados sejam respeitadas.
  - Permanecer independente de detalhes de infraestrutura, frameworks ou aplicativos específicos.
- **Interação com Outras Camadas**:
  - As entidades são usadas pelos casos de uso para encapsular regras de negócio que são aplicadas em cenários de aplicação específicos. Não têm conhecimento de como são persistidas ou apresentadas.

### 3.2. Casos de Uso (Use Cases)

- **Descrição Detalhada**: Esta camada define os fluxos de aplicação centrados na realização de tarefas que são vantajosas para o usuário. Os casos de uso coordenam a interação entre as entidades para implementar uma funcionalidade específica, garantindo que todas as regras e lógicas de negócio sejam cumpridas.
- **Responsabilidades**:
  - Levar adiante os cenários específicos de aplicação que envolvem o uso das entidades.
  - Gerenciar o fluxo de dados entre as entidades e a camada de adaptadores de interface, transformando as interações chamadas pelos usuários em ações significativas.
  - Garantir que a lógica de aplicação seja independente dos frameworks UI e drivers de banco de dados.
- **Interação com Outras Camadas**:
  - Interagem com adaptadores de interface para receber e responder a ações do usuário.
  - Utilizam as entidades para aplicar a lógica de negócios.

### 3.3. Adaptadores de Interface

- **Descrição Detalhada**: A camada de adaptadores de interface atua como um tradutor entre a interface do usuário (UI ou API HTTP) e os casos de uso. Essa camada é responsável por converter entradas de dados de um formato específico em algo que os casos de uso possam processar, e formatar saídas de dados dos casos de uso.
- **Responsabilidades**:
  - Validar e transformar dados de entrada vindo de interfaces externas.
  - Chamar os casos de uso apropriados, fornecendo dados de uma maneira que possam ser facilmente processados pelo domínio.
  - Formatando a saída de dados para uma forma utilizável por sistemas externos ou interfaces de apresentação.
- **Interação com Outras Camadas**:
  - Recebem comandos de sistemas de entrada e podem passar dados aos casos de uso adequados.
  - Formatam a saída dos casos de uso para enviar de volta a sistemas externos ou interfaces de apresentação.

### 3.4. Frameworks e Drivers

- **Descrição Detalhada**: Esta é a camada mais externa e contém todas as partes de comunicação e detalhes de implementação técnica que não são parte da lógica de negócios. Nesta camada, incluem-se elementos como frameworks web, bancos de dados, sistemas de arquivos e gerenciadores de autenticação.
- **Responsabilidades**:
  - Facilitar a integração técnica com componentes externos, como serviços de banco de dados, redes, bibliotecas de autenticação e outros.
  - Satisfazer as requisições de dados persistentes através do armazenamento e recuperação.
  - Manter a flexibilidade para que essas tecnologias possam ser modificadas ou atualizadas sem impactar as camadas de negócios de aplicação.
- **Interação com Outras Camadas**:
  - Fornece dependências necessárias para as camadas superiores, utilizando técnicas como injeção de dependência para manter a lógica de negócios desacoplada dos detalhes técnicos.

## 4. Detalhes de Implementação

### 4.1. Tecnologias Utilizadas

- **TypeScript**: Linguagem de programação que estende o JavaScript adicionando tipagem estática. No projeto, isso ajuda a reduzir erros e aumentar a legibilidade do código.
- **Tsx**: Utilizado para executar arquivos TypeScript diretamente no Node.js, simplificando o desenvolvimento e eliminando a necessidade de configuração complexa.
- **Vitest**: Utilizado para testes unitários devido à sua compatibilidade com TypeScript e interface simples.
- **Jest e Supertest**: Jest é usado para a realização de testes de unidade mais extensos, enquanto Supertest permite simulação e verificação de requisições HTTP para testes de integração.
- **Cypress**: Ferramenta de teste end-to-end que simula o comportamento do usuário e verifica o funcionamento do sistema de ponta a ponta em ambientes de navegador.
- **Express**: Framework minimalista para Node.js, utilizado para construir a API RESTful do projeto, facilitando o tratamento de requisições e respostas HTTP.
- **CORS (Cross-Origin Resource Sharing)**: Mecanismo que permite ou restringe solicitação de recursos dependendo da origem do solicitante, configurado para proteger a API de acessos não autorizados.
- **Prisma ORM**: Abstração de banco de dados que simplifica consultas e mutações, além de fornecer ferramentas automáticas de migração.
- **Dotenv**: Biblioteca para carregamento de variáveis de ambiente a partir de um arquivo `.env`, permitindo a configuração de variáveis sensíveis de forma segura.
- **Zod**: Biblioteca para validação de esquemas de dados que garante que as entradas do usuário sejam verificadas antes do processamento.
- **JSON Web Token (JWT)**: Implementado para autenticação e autorização segura, permitindo que tokens sejam passados pela API como representações dos usuários autenticados.
- **Winston**: Biblioteca para criação e controle de logs, capaz de gerenciar diferentes níveis de registro e integrando-se bem com grandes quantidades de dados logados.
- **Bcrypt**: Utilizado para o hashing de senhas dos usuários antes de armazená-las, garantindo que os dados armazenados sejam seguros mesmo em caso de vazamento de informações.
- **Next.js**: : Next.js é um framework React voltado para o desenvolvimento de aplicações web e sites otimizados, com suporte tanto para renderização no lado do servidor (SSR) quanto para a geração de páginas estáticas (SSG)
- **JavaScript:**: Linguagem de programação amplamente usada para construir aplicações interativas e escaláveis
- **CSS**: Linguagem de estilo usada para definir a aparência visual de elementos web, como cores, tamanhos, fontes e layouts.
- **HTML**: Linguagem de marcação que estrutura e organiza o conteúdo de páginas web, utilizando tags para elementos como cabeçalhos, parágrafos e links
- **Vercel**: Plataforma de implantação escalável, projetada para trabalhar com Next.js, fornecendo suporte a SSR, SSG e ferramentas de otimização.
- **Chart.js**: Biblioteca para criação de gráficos interativos em JavaScript, com alta personalização e compatibilidade com React.
- **Axios**: Biblioteca para realizar requisições HTTP, facilitando a comunicação entre o cliente e o servidor.
- **Formik**: Ferramenta para criar e gerenciar formulários de forma simplificada, ideal para aplicações com grande inserção de dados.


### 4.2. Organização do Código no Backend

```text
.
├── src
│   ├── application
│   │   ├── interfaces
│   │   │   └── repositories
│   │   ├── services
│   │   ├── useCases
│   │   └── utils
│   ├── domain
│   │   ├── entities
│   │   └── factories
│   ├── infrastructure
│   │   └── database
│   ├── main
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   └── routes
└── test
```

#### Explicações sobre cada diretório:

- **src**: Diretório raiz onde todo o código do aplicativo deveria residir.
  - **application**: Camada de aplicação que contém lógica de negócios específica do aplicativo.
    - **interfaces**: Definições de interfaces que servem como contratos para comunicação entre diferentes camadas/modules.
      - **repositories**: Interfaces para persistência e recuperação de entidades de domínio.
    - **services**: Serviços que encapsulam lógica de aplicação não específica de um caso de uso.
    - **useCases**: Implementações de casos de uso que orquestram a lógica do aplicativo para atingir os objetivos do usuário.
    - **utils**: Funções utilitárias não específicas a nenhum caso de uso ou serviço em particular.
  - **domain**: Contém o núcleo do aplicativo, onde reside a lógica de negócios essencial.
    - **entities**: Definições de entidades de domínio que encapsulam regras de negócio.
    - **factories**: Fábricas para criação de objetos de domínio, facilitando construções complexas.
  - **infrastructure**: Cumpre o papel de fornecer implementações concretas para interfaces definidas nas camadas superiores.
    - **database**: Implementações de repositórios, mapeadores e estratégias de conexão.
  - **main**: A camada mais externa que configura e inicia o aplicativo.
    - **config**: Configurações e constantes globais.
    - **controllers**: Controladores que lidam com a entrada HTTP e transformam chamadas em ações.
    - **middlewares**: Middlewares que processam solicitações e respostas de forma genérica.
    - **routes**: Definições de rotas que mapeiam URLs para controladores.
  - **test**: Onde todos os testes automatizados residem, como testes unitários, de integração, de aceitação, etc.

### 4.2.1. Organização do Código no Frontend
'''text
├── public/
│   ├── images/            
│   ├── fonts/              
├── src/               
│   ├── components        
│   │    
│   ├── layouts/           
│   │   └── MainLayout.js   
│   ├── pages  
│   │   ├── index.js   
│   │   ├── about.js
│   │   └── dashboard/      
│   │       ├── index.js         
│   │ 
│   ├── styles          
│   │    
│   ├── utils           
│   │  
│   ├── hooks/            
│   │   ├── useAuth.js     
│   │   └── useFetch.js     
│   ├── context/           
│   │   └── AuthContext.js  
│   ├── services/
│   │   ├── api.js          
│   │      
│   ├── config/    
│   │   └── appConfig.js           
├── .env.local              
├── next.config.js          
└── package.json    
      
#### Explicações sobre cada diretório:
- **src**: Diretório principal que contém todo o código-fonte da aplicação.
  - **components**: Armazena componentes reutilizáveis, como botões, cartões, modais, etc.
  - **layouts**: 
    - **MainLayout.js**: Define a estrutura de layout comum da aplicação, incluindo elementos compartilhados como barra de navegação e rodapé. 
  - **pages**: Diretório obrigatório do Next.js para gerenciamento de rotas.
    - **index.js**: Página inicial da aplicação, acessível pela URL raiz (/).
    - **about.js**: Página "Sobre", acessível pela rota /about.
    - **dashboard**: Subdiretório para páginas relacionadas ao painel de controle.
      - **index.js**: Página principal do painel, acessível pela rota /dashboard.
  - **styles**: Diretório para estilos globais e específicos.
  - **utils**: Contém funções utilitárias que são genéricas e podem ser usadas em qualquer parte do projeto.
  - **hooks**: Diretório para hooks personalizados do React, que encapsulam lógica reutilizável.
    - **useAuth.js**: Hook para lidar com autenticação do usuário.
    - **useFetch.js**: Hook para realizar requisições a APIs e gerenciar estados de carregamento/erro.
  - **context**: Diretório para os contextos globais do React, que permitem o compartilhamento de estados entre diferentes partes da aplicação.
    - **AuthContext.js**: Contexto para gerenciar informações de autenticação e estados do usuário logado.
  - **services**: Contém a lógica para interagir com APIs externas.
    - **api.js**: Configuração centralizada para requisições HTTP
  - **config**: Armazena configurações globais e constantes.
    - **appConfig.js**: Arquivo para variáveis de configuração.
- **.env.local**: Arquivo para variáveis de ambiente específicas do ambiente local
- **next.config.js**: Arquivo de configuração do Next.js, usado para customizações como redirecionamentos, otimizações e definições de ambiente.
- **package.json**: Contém metadados do projeto e lista de dependências utilizadas.


## 5. Estratégia de Testes

### 5.1. Testes Unitários

- **Framework**: Vitest.
- **Cobertura**: Foco em funções de manipulação de dados em entidades e casos de uso.

### 5.2. Testes de Integração

- **Framework**: Jest com Supertest.
- **Cobertura**: Verificações de fluxos de dados entre módulos e API, incluindo autenticação e operações de CRUD.

### 5.3. Testes End-to-End

- **Ferramenta**: Cypress.
- **Cobertura**: Simulação de interações completas do usuário com o sistema através de navegadores reais.

## 6. Segurança

### 6.1. Autenticação e Autorização

- Implementação de JWT para sessões de usuário seguras e verificáveis.
- Requisições de autenticação utilizando middlewares do Express para validação de tokens.

### 6.2. Proteções contra Vulnerabilidades

- **Validação de Entrada**: Uso de Zod para garantir que as entradas do usuário sejam verificadas antes do processamento.
- **Proteção de Senhas**: Senhas são armazenadas apenas pós-hashing com bcrypt, reforçando a segurança.

## 7. Considerações Finais

### 7.1. Desafios e Soluções

- **Observabilidade e monitoramento**: Uso extensivo de logs com Winston para monitoramento da aplicação e busca de bugs.

## 8. Anexos

### 8.1. Glossário

- **JWT**: Token de autenticação baseado em JSON.
- **ORM**: Mapeamento objeto-relacional, usado para interagir com bancos de dados.

### 8.2. Referências

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tsx](https://tsx.is/)
- [Express](https://expressjs.com/)
- [CORS](https://github.com/expressjs/cors#readme)
- [Zod](https://zod.dev/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [Prisma](https://www.prisma.io/docs/)
- [Dotenv](https://github.com/motdotla/dotenv#readme)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Vitest](https://vitest.dev/guide/)
- [Jest](https://jestjs.io/pt-BR/docs/getting-started)
- [Supertest](https://github.com/ladjs/supertest#readme)
- [Cypress](https://docs.cypress.io/app/get-started/why-cypress)
- [Winston](https://github.com/winstonjs/winston#readme)
