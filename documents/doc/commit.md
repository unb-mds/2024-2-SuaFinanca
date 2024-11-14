# Documentação para Padrões de Commit e Nomeação de Branches

Este documento estabelece os padrões de commit e nomeação das branches do projeto, com o objetivo de garantir consistência e rastreabilidade no histórico de commits e branches. Serão seguidos os padrões **Conventional Commits** (inspirados nas convenções do Angular) para os commits e um padrão específico para a nomeação de branches, com vinculação de commits e branches às issues para facilitar o monitoramento de mudanças e o desenvolvimento colaborativo.

---

## 1. Padrões de Commit

### 1.1 Estrutura Geral dos Commits

Todos os commits devem seguir o formato abaixo:

```
<tipo>(<escopo>): <descrição>
<linha em branco>
[Opcional: corpo do commit]
<linha em branco>
[Opcional: rodapé]
```

**Exemplo de commit:**

```
feat(auth): adiciona autenticação com OAuth2

Implementa autenticação utilizando OAuth2 para melhorar a segurança dos usuários.

Closes #42
```

### 1.2 Elementos do Commit

- **Tipo**: Define o tipo de mudança no código.
- **Escopo**: Especifica a área afetada pelo commit.
- **Descrição**: Explica brevemente a mudança (máximo de 72 caracteres).
- **Corpo (Opcional)**: Expande a descrição com detalhes adicionais.
- **Rodapé (Opcional)**: Inclui referências a issues ou notas adicionais, usando `Closes #<número_da_issue>` ou `Refs #<número_da_issue>` para associar o commit a uma issue.

### 1.3 Tipos de Commit

| Tipo       | Descrição                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------- |
| `feat`     | Para novos recursos ou funcionalidades.                                                       |
| `fix`      | Para correção de bugs.                                                                        |
| `docs`     | Atualizações na documentação.                                                                 |
| `style`    | Alterações de estilo ou formatação que não afetam a funcionalidade (ex.: espaço, vírgula).    |
| `refactor` | Alterações no código que não afetam sua funcionalidade ou comportamento externo.              |
| `test`     | Adição ou correção de testes.                                                                 |
| `chore`    | Atualizações em tarefas de build, configurações, dependências, etc., que não afetam o código. |
| `perf`     | Alterações de desempenho ou melhorias de performance.                                         |
| `ci`       | Modificações nos arquivos de configuração de integração contínua.                             |
| `revert`   | Reversão de um commit anterior.                                                               |

### 1.4 Escopo

O **escopo** especifica a área afetada pelo commit e deve indicar qual módulo, função ou componente foi modificado. Utilizar escopos bem definidos torna o histórico de commits mais legível e organizado.

**Regras para Definir o Escopo**

1. **Módulo ou Componente**: Utilize o nome do módulo, componente, ou serviço principal que foi modificado. Exemplo: `auth`, `user`, `routes`, `dashboard`, `ui`.
2. **Função ou Classe**: Quando a alteração é específica a uma função ou classe dentro de um módulo, especifique o nome dela. Exemplo: `login-service` ou `button`.
3. **Arquivo Específico**: Se há mais de um arquivo em uma pasta e a alteração se aplica apenas a um arquivo específico, inclua o nome do arquivo no escopo.
4. **Consistência**: Mantenha o uso de escopos consistente ao longo do projeto para evitar ambiguidades. Sempre que possível, utilize o mesmo nome para o mesmo módulo ou componente.

**Exemplo de commit:**

**1. Módulo ou Componente**

```
feat(routes): adiciona endpoint para recuperação de senha

Implementa endpoint `/main/routes` para envio de email de recuperação de senha.

Refs #58
```

**2. Função ou Classe**

```
feat(login-service): adiciona suporte a autenticação multifatorial

Implementa verificação adicional para autenticação, permitindo múltiplos fatores.

Closes #102
```

**3. Arquivo Específico**

```
feat(protocols): atualiza protocolos de autenticação de usuário

Refatora e ajusta os protocolos de autenticação de usuário no arquivo protocols.ts para atender a novos requisitos de segurança.

Refs #74
```

### 1.5 Vinculação de Commits com Issues

Para garantir rastreabilidade, todos os commits que resolvem ou estão relacionados a uma issue devem incluir referências no **rodapé** da mensagem de commit, usando palavras-chave específicas para identificar a relação.

#### Sintaxe para Vinculação de Commits

No rodapé do commit, use a seguinte estrutura:

```
<palavra-chave> #<número_da_issue>
```

#### Palavras-chave Permitidas

| Palavra-chave | Descrição                                                                               |
| ------------- | --------------------------------------------------------------------------------------- |
| `Closes`      | Indica que o commit resolve completamente a issue e, portanto, a fecha automaticamente. |
| `Fixes`       | Sinônimo de `Closes`, indicando resolução da issue.                                     |
| `Refs`        | Indica que o commit está relacionado à issue, mas não a resolve ou fecha.               |

#### Regras Importantes para Vinculação

- **Sempre Vincule**: Todo commit relacionado a uma issue deve incluir uma referência, seja para fechamento ou apenas relação.
- **Uma Issue por Commit**: Em geral, cada commit deve referenciar uma única issue para manter a rastreabilidade clara.
- **Rodapé**: A referência à issue deve estar no **rodapé** da mensagem de commit, após uma linha em branco.

---

## 2. Padrões de Nomeação de Branches

Para organizar o desenvolvimento e facilitar a rastreabilidade das mudanças, cada branch deve ser vinculada a uma issue, seguindo o padrão descrito a seguir.

### 2.1 Estrutura Geral das Branches

O nome de cada branch deve seguir o formato:

```
<origem>-<número_da_issue>/<tipo>/<descrição_curta>
```

**Exemplo de nome de branch:**

```
back-42/feat/autenticacao-oauth
```

### 2.2 Elementos da Nomeação de Branches

- **Origem (Opcional)**: Indica se a branch irá modificar alguma funcionalidade do frontend (`front`) ou do backend (`back`).
- **Número da Issue**: Vincula a branch a uma issue específica para facilitar o rastreamento.
- **Tipo**: Indica o tipo de trabalho realizado na branch.
- **Descrição Curta**: Um resumo breve e direto da tarefa em execução na branch.

### 2.3 Tipos de Branch

| Tipo       | Descrição                             |
| ---------- | ------------------------------------- |
| `feat`     | Para novas funcionalidades.           |
| `fix`      | Para correção de bugs.                |
| `docs`     | Para documentação.                    |
| `style`    | Para ajustes de estilo ou formatação. |
| `refactor` | Para refatoração de código.           |

### 2.4 Exemplo de Nomes de Branch

Para a issue **#50**, que requer a criação de um novo formulário de login com validação básica:

1. Crie a branch com o nome adequado:

   ```
   front-50/feat/cria-formulario-login
   ```

2. Realize um commit seguindo o padrão convencionado:

   ```
   feat(auth): cria formulário de login com validação básica

   Adiciona um novo formulário de login com campos de validação para email e senha.

   Closes #50
   ```

---

## 3. Boas Práticas Gerais

1. **Commits Frequentes**: Realize commits sempre que finalizar uma pequena tarefa para facilitar o rastreamento e revisão do progresso.
2. **Commit Atômico**: Cada commit deve ser atômico e focado em uma única tarefa ou correção, evitando mudanças diversas em um mesmo commit.
3. **Nome de Branch Curto e Claro**: Utilize descrições curtas e objetivas ao nomear suas branches.
4. **Vinculação de Commits e Branches às Issues**: Sempre que possível, associe commits e branches às issues para garantir rastreabilidade e documentação adequada das alterações.
