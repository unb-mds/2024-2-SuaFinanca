# Atualização da Documentação do Projeto: Novo Fluxo de Acesso


## Contextualização
Esta atualização da documentação tem como objetivo apresentar o novo fluxo de acesso implementado no site, que redefine a maneira como os usuários interagem com as funcionalidades disponibilizadas. O documento fornece uma comparação entre o fluxo anterior e o atual, destacando as razões para a alteração e oferecendo diretrizes para implementação e suporte.

## Fluxo Anterior
Anteriormente, os usuários eram direcionados inicialmente para a página de login antes de poderem acessar o site, restringindo a experiência inicial e limitando o acesso prévio ao conteúdo ou funcionalidades.

### Características do Fluxo Anterior:
- **Início na página de Login:** O site carregava diretamente a página de login e senha.
- **Acesso livre após autenticação:** Após inserir as credenciais, o usuário conseguia acessar o Dashboard e outras funcionalidades do site.
- **Ausência de controle de usuários:** Não era possível identificar ou registrar as atividades dos usuários.

## Novo Fluxo de Acesso
No novo fluxo, todas as funcionalidades além do **Dashboard** estão condicionadas à criação de um registro de login e senha. Esta alteração visa aumentar a segurança, garantir personalização da experiência do usuário e melhorar o controle sobre o acesso às funcionalidades do sistema.

### Descrição do Novo Fluxo:
1. **Início na página de Dashboard:** O site continua carregando a página inicial como o ponto de entrada.
2. **Registro obrigatório:** Para acessar qualquer funcionalidade além do Dashboard, o usuário é redirecionado para uma tela de criação de conta, onde deve informar:
   - Nome de usuário;
   - Senha;
   - Dados adicionais (se necessário).
3. **Autenticação:** O usuário deve se autenticar com as credenciais criadas sempre que desejar acessar funcionalidades além do Dashboard.
4. **Persistência de Sessão:** Uma vez autenticado, o usuário permanece logado até que:
   - Opte por sair explicitamente;
   - A sessão expire.

### Benefícios do Novo Fluxo:
- **Mais segurança:** Funcionalidades sensíveis agora só podem ser acessadas por usuários autenticados, reduzindo riscos.
- **Experiência personalizada:** Permite que cada usuário receba conteúdos e recursos ajustados às suas necessidades.
- **Controle aprimorado:** Proporciona registro de atividades e facilita auditorias para monitoramento e análise.

## Impactos

### Impactos no Usuário:
- **Novas exigências:** É necessário criar uma conta e realizar login para acessar certas funcionalidades.
- **Interface mais intuitiva:** O sistema pode oferecer uma experiência mais adaptada aos perfis individuais dos usuários.

## Orientações para Suporte

### Perguntas Frequentes:
1. **Esqueci minha senha, o que fazer?**
   - Oriente o usuário a utilizar a opção "Esqueci minha senha" para redefini-la de forma segura.
2. **Erro ao tentar autenticar, como resolver?**
   - Verifique se as credenciais fornecidas estão corretas e instrua o usuário a corrigir possíveis erros.
3. **Quantas tentativas de login são permitidas?**
   - Consulte as configurações do sistema para confirmar os limites e informe o usuário sobre bloqueios temporários após tentativas fracassadas.