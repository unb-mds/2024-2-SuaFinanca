## Requisitos Funcionais Detalhados

1. **Cadastro de Receitas e Despesas** *Must Have (Obrigatórios)*
   - O sistema deve oferecer formulários específicos para o registro de receitas e despesas, incluindo:
     - *Descrição da transação*: Campo de texto para detalhar a natureza da receita ou despesa.
     - *Valor*: Campo numérico para informar o valor da transação.
     - *Data*: Campo de data para registro do momento da transação.
     - *Categoria*: Seleção de categorias padrão (ex: salário, transporte, alimentação) e a possibilidade de o usuário criar novas categorias.
	- O sistema deve permitir o registro de dívidas e empréstimos, incluindo detalhes como valor, juros e prazo de pagamento.
   - Funcionalidades:
     - Permitir o registro e armazenamento de cada transação individual com os campos mencionados.
     - Possibilitar a edição e remoção de transações.
     - Fornecer filtros para que o usuário visualize as transações por data, categoria e tipo (receita ou despesa).

2. **Categorização de Transações** *Must Have (Obrigatórios)*
   - O sistema deve oferecer categorias predefinidas para facilitar a análise de dados, como:
     - *Receitas*: Salário, freelance, investimentos, outros.
     - *Despesas*: Alimentação, transporte, lazer, saúde, contas mensais, educação, etc.
   - Funcionalidades adicionais:
     - Permitir que o usuário crie, edite ou exclua categorias personalizadas para uma maior flexibilidade.
     - Oferecer uma lista de categorias para simplificar o preenchimento futuro de transações.

3. **Visão de Saldo Atual** *Must Have (Obrigatórios)*
   - O sistema deve calcular e exibir em tempo real o saldo disponível do usuário:
     - Saldo total: Diferença entre a soma das receitas e das despesas cadastradas.
     - Saldo por categoria: Saldo específico por categoria de receita ou despesa.
   - Funcionalidades adicionais:
     - *Permitir que o usuário defina um saldo inicial.*
     - Exibir o saldo em um painel inicial ou dashboard sempre que o usuário acessar o sistema.

4. **Relatórios Financeiros** *Should Have (Desejáveis)*
   - O sistema deve gerar relatórios financeiros automáticos, incluindo:
     - Resumo mensal: Receita total, despesa total e saldo final.
     - Detalhamento por categoria: Exibir a distribuição de receitas e despesas por categoria.
     - Histórico de saldo: Evolução do saldo ao longo dos meses anteriores.
     - Resumo de Dívidas: Exibição de um resumo de dívidas ativas com histórico de pagamentos e saldo devedor.
   - Funcionalidades adicionais:
     - Permitir ao usuário escolher o período dos relatórios (ex: semanal, mensal, trimestral).
     - Oferecer exportação dos relatórios para PDF.

5. **Notificações de Gastos** *Should Have (Desejáveis)*
   - O sistema deve notificar o usuário sobre padrões de gastos para ajudá-lo no controle financeiro, incluindo:
     - Notificação de limite de gastos: Alertas configuráveis para informar quando o usuário está próximo de um limite estabelecido.
     - Lembretes: Notificações sobre prazos de contas a pagar, configuráveis pelo usuário.
     - Lembretes de Pagamento: Configuração de alertas para pagamentos de dívidas, incluindo notificações de vencimento e resumo do valor restante a pagar.
   - Funcionalidades adicionais:
     - Oferecer configuração de notificações por email ou push notification (caso em app mobile).
     - Permitir ajustes nos limites e nas preferências de notificação.

6. **Gráficos de Análise de Despesas** *Should Have (Desejáveis)*
   - O sistema deve exibir gráficos ilustrativos para auxiliar o usuário a entender melhor seus padrões financeiros, incluindo:
     - Gráfico de pizza: Distribuição percentual de despesas e receitas por categoria.
     - Gráfico de linha ou barra: Evolução dos gastos e receitas ao longo do tempo.
     - Comparação Real vs. Planejado: Exibir gráficos comparativos para mostrar o valor real gasto em relação ao orçamento planejado.
   - Funcionalidades adicionais:
     - Permitir a seleção de períodos customizados para visualização dos gráficos.
     - Opção para visualizar gráficos comparativos (ex: comparar despesas do mês atual com o mês anterior).

7. **Metas de Poupança e Investimento** *Could Have (Opcional)*
	- Estabelecimento de Metas de Poupança: O usuário deve poder definir metas específicas de economia para diferentes finalidades (ex: viagem, compra de imóvel).
	- Monitoramento de Progresso: Exibir o progresso de cada meta com atualizações automáticas conforme o usuário faz novos depósitos.

8. **Análise de Padrões de Gastos** *Could Have (Opcional)*
	- Identificação de Padrões: O sistema deve analisar transações passadas e identificar padrões de gastos recorrentes, exibindo insights para o usuário.
	- Análise de Despesas Supérfluas: Classificar despesas como essenciais ou supérfluas e sugerir ajustes para otimizar o orçamento.
	- Alertas de Padrões Negativos: Notificar o usuário quando identificar um padrão de gastos que pode ser prejudicial ao orçamento ou às metas de poupança.

## Requisitos Não-Funcionais Detalhados

1. **Segurança de Dados**
   - O sistema deve garantir a segurança e privacidade dos dados pessoais e financeiros, incluindo:
     - Autenticação: Sistema de login seguro com uso do JWT.
     - Criptografia: Criptografia de dados sensíveis.
     - Sistema de Logs: Manter logs de atividades para recuperação e auditoria em caso de erros.

2. **Usabilidade**
   - Interface intuitiva, organizada e responsiva, incluindo:
     - Design simplificado para fácil navegação e uso rápido.
     - Feedback visual de operações importantes (ex: salvamento de transações, emissão de notificações).
   - Funcionalidades adicionais:
     - Modo claro e escuro para conforto visual.