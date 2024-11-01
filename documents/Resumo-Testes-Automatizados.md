# Testes Automatizados - Fundamentos e Práticas (Unitários, Integração, E2E)

## Escopo do estudo

- Entender e explicitar a definição de testes de software;
- Conhecer os conceitos fundamentais de testes de software;
- Compreender as diferenças entre testes unitários, integração e E2E;
- Saber como aplicar boas práticas, como nomes descritivos e isolamento dos testes;
- Implementar design patterns de teste (AAA, Test Data Builder, Mock Objects);
- Saber como configurar e usar ferramentas de testes, como Vitest, Jest, Supertest e Cypress;
- Adotar práticas de teste (AAA, isolamento, nomes descritivos);
- Princípio **“FIRST”** nos testes automatizados.

## O que é?

É o processo de avaliar e verificar o funcionamento de um sistema ou aplicação, assegurando que ele cumpra com os requisitos e funcione conforme ele foi projetado. O principal objetivo dos testes é identificar defeitos que possam causar falhas, garantindo que o sistema execute suas funções corretamente. Além disso, os testes de software confirmam que o sistema atende às expectativas e necessidades do usuário final, ajudando a validar os requisitos especificados.

A prática de testar software contribui significativamente para aprimorar a qualidade do produto, melhorando a confiabilidade, segurança e desempenho da aplicação. Os testes também são fundamentais para prevenir problemas futuros, especialmente ao implementar novas funcionalidades. Testes automatizados, por exemplo, são úteis para verificar continuamente que atualizações e alterações no código não introduzam novos defeitos, assegurando que as funcionalidades existentes permaneçam intactas.

Os testes podem ser realizados manualmente ou com ferramentas de automação, dependendo da fase do desenvolvimento e da cobertura desejada. Para atender diferentes aspectos do sistema, eles são divididos em categorias, como **testes unitários**, que verificam unidades específicas de código, **testes de integração**, que analisam a interação entre módulos, e **testes de ponta a ponta (E2E)**, que simulam o comportamento do usuário no sistema completo. Em conjunto, essas práticas aumentam a confiabilidade do software para o desenvolvedor, assim garantindo que seja um software que tenha uma alta qualidade, além de fazer o usuário ter uma boa experiencia ao utilizar a aplicação. 

## Conceitos Fundamentais de Testes de Software

### Mocks
- **Definição**: são objetos simulados que imitam o comportamento de componentes reais em um sistema durante os testes de software; 
- **Função**: são utilizados para isolar a unidade de código em teste; 
- **Vantagens**: permitem que os desenvolvedores verifiquem a funcionalidade de uma parte do sistema sem depender de suas interações reais com outras partes ou serviços externos.

### Testes Unitários
- **Objetivo**: avaliar a menor unidade de código, como por exemplo uma função ou um método;
- **Vantagens**: são rápidos e focados, ajudando a isolar e identificar problemas com precisão;
- **Ferramentas**: será utilizado o Jest (JavaScript) e o Vitest (Vue.js).

### Testes de Integração
- **Objetivo**: garantir que componentes diferentes funcionem bem juntos, verificando interações entre módulos;
- **Vantagens**: identifica problemas na comunicação entre serviços e dependências, sendo eles APIs e módulos;
- **Ferramentas**: será utilizado o Supertest (para testar requisições HTTP).

### Testes End-to-End (E2E)
- **Objetivo**: testar a aplicação como um todo, simulando o comportamento do usuário final;
- **Vantagens**: útil para validar fluxos completos e cenários reais;
- **Ferramentas**: será utilizado o Cypress (simulação de interações em aplicações web).

## Diferenças entre Testes Unitários, Integração e E2E

| Tipo de Teste  | Escopo            | Exemplo                           | Ferramentas                   |
|----------------|-------------------|-----------------------------------|-------------------------------|
| **Unitário**   | Função ou método  | Validar cálculo de uma função     | Vitest, Jest                  |
| **Integração** | Módulos e APIs    | Checar integração API e banco     | Jest, Supertest               |
| **E2E**        | Aplicação inteira | Simular compra em e-commerce      | Cypress                       |

## Boas Práticas: Nomes Descritivos e Isolamento de Testes

- **Nomes Descritivos**: usar nomes que expliquem o propósito do teste, por exemplo, `deveRetornarErroSeEmailInvalido`;
- **Isolamento de Testes**: cada teste deve ser independente, sem depender de dados persistentes ou estado de outros testes.
  - Utilize **mocks** para dependências externas;
  - Limpe dados de teste antes de cada execução.

## Design Patterns de Teste

- **AAA (Arrange, Act, Assert)**: estrutura básica de um teste:
  - **Arrange**: configuração dos dados necessários;
  - **Act**: execução da ação a ser testada;
  - **Assert**: verificação do resultado esperado.

- **Test Data Builder**: facilita a criação de dados complexos e reutilizáveis para testes;

- **Mock Objects**: objetos simulados para substituir dependências externas, garantindo que o teste seja isolado e previsível.

## Configuração e Uso das Ferramentas de Teste

- **Vitest**: ferramenta para projetos Vue.js, rápida e ideal para testes unitários e de integração;
- **Jest**: ampla utilização em projetos JavaScript e TypeScript, com bom suporte a mocks e estrutura AAA;
- **Supertest**: facilita o teste de requisições HTTP, ideal para APIs;
- **Cypress**: focado em testes E2E, simula interações do usuário e oferece um painel visual para execução.

## Práticas Essenciais em Testes Automatizados

### Princípio “FIRST”
- **Fast**: testes devem rodar rapidamente;
- **Independent**: não devem depender uns dos outros;
- **Repeatable**: devem ter os mesmos resultados a cada execução;
- **Self-validating**: resultados claros (correto ou falha);
- **Timely**: escrita de testes ao criar novas funcionalidades.

