# S.O.L.I.D

## 1. O que é?

SOLID é uma sigla que representa certos princípios de programação, onde cada letra significa:

- **Single Responsibility Principle (Princípio da responsabilidade única)**
- **Open/Closed Principle (Princípio Aberto/Fechado)**
- **Liskov Substitution Principle (Princípio da Substituição de Liskov)**
- **Interface Segregation Principle (Princípio da Segregação de Interface)**
- **Dependency Inversion Principle (Princípio da Inversão de Dependência)**

## 2. Single Responsibility Principle

Esse princípio nos diz que é melhor ter várias classes fazendo funções específicas e especializadas em um assunto, do que apenas uma classe que faz várias funções.

### 2.1 Exemplo

Ao invés de ter um robô que faz quatro funções como limpar, cozinhar, pintar e cortar a grama, é melhor ter quatro robôs que fazem apenas uma dessas funções, porém sendo os melhores naquela atividade específica.

### 2.2 Por que fazer isso

Fazendo isso, fica mais fácil para:

- Reaproveitamento de código
- Refatoramento
- Testes automatizados
- Gerar menos bugs e corrigi-los mais facilmente

## 3. Open/Closed Principle

Esse princípio diz que classes, entidades e funções devem estar abertas para extensão, mas fechadas para modificação.

### 3.1 Exemplos

Suponha que uma classe `Relatório` gere relatórios no formato PDF, e que você queira que ela também gere relatórios CSV. Seguindo esse princípio, você não deve alterar algo já existente na classe, mas sim adicionar essa funcionalidade.

### 3.2 Por que fazer isso

Mudar o comportamento atual de uma classe pode acabar afetando outros sistemas que utilizam essa classe. Esse princípio diz que, se você quiser que uma classe faça mais funções, o ideal é adicionar essas funções à classe em vez de alterar as já existentes, minimizando assim o risco de novos bugs.

## 4. Liskov Substitution Principle

Esse princípio nos diz que, se temos uma classe e dela for criada uma subclasse por herança, o objeto ou instância dessa subclasse deve conseguir substituir o objeto da classe principal.

### 4.1 Por que fazer isso

Esse princípio tem como objetivo fazer com que tanto a classe pai quanto a classe filha possam realizar as mesmas funções da mesma maneira, sem erros, dando assim mais consistência ao código e facilitando sua manutenção e compreensão.

## 5. Interface Segregation Principle

O cliente/usuário não deve ser forçado a usar métodos e funções que ele não for usar.

### 5.1 Exemplo

Suponha que uma interface chamada `Animal` contenha três métodos: `comer`, `dormir` e `voar`. E que duas classes, `Papagaio` e `Elefante`, irão implementar seus métodos.

No caso do `Papagaio`, ele usará todos os métodos sem problemas. Mas, no caso do `Elefante`, ele será obrigado a implementar o método `voar`, que ficará sem uso.

A maneira correta, usando este princípio, seria dividindo essa interface em interfaces menores, fazendo assim com que as classes possam implementar apenas o necessário.

### 5.2 Por que fazer isso

Por meio desse princípio, podemos evitar que classes herdem métodos dos quais elas não utilizarão, reduzindo assim o acoplamento e aumentando a flexibilidade e clareza do código.

## 6. Dependency Inversion Principle

Esse princípio diz que módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações. Além disso, abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

### 6.1 Exemplo

Se você tem uma classe `Pedido` que depende de uma classe `Estoque`, em vez de `Pedido` depender diretamente de `Estoque`, `Pedido` deve depender de uma interface `IEstoque`. Dessa forma, `Pedido` pode trabalhar com qualquer implementação de `IEstoque`, facilitando a troca de implementações.

### 6.2 Por que fazer isso

Isso permite que os componentes do sistema sejam menos acoplados e mais flexíveis, facilitando a manutenção e a escalabilidade do código.

## 7. Por que usar o SOLID?

Os princípios SOLID são fundamentais para o desenvolvimento de software de alta qualidade. Eles ajudam a criar sistemas que são:

- **Mais Fáceis de Manter:** Classes e métodos bem definidos e com responsabilidades claras tornam o código mais legível e fácil de modificar.
- **Mais Flexíveis:** Facilita a adição de novas funcionalidades sem alterar o comportamento existente, reduzindo o risco de introduzir novos bugs.
- **Mais Testáveis:** Código desacoplado e modular permite a criação de testes unitários mais eficazes.
- **Mais Reutilizáveis:** Componentes bem definidos podem ser reutilizados em diferentes partes do sistema ou em outros projetos.

Em resumo, aplicar os princípios SOLID melhora significativamente a qualidade do código, tornando o desenvolvimento de software mais eficiente e eficaz.
