# Instalando o Docker
- Vá até a página oficial do Docker e instale-o no seu sistema (macOS, Windows, Ubuntu, etc.) ou, alternativamente, instale-o diretamente no terminal.
- Você pode usar o terminal do Docker Desktop para codar diretamente ou então utilizar o VSCode com a extensão "Docker".

# O que é o Docker?
- O Docker é uma plataforma open source que facilita a criação e administração de ambientes. Com ele, podemos empacotar uma aplicação ou ambiente dentro de um container.
- O Docker resolve problemas de compatibilidade. Por exemplo, se um colega de trabalho tem uma tecnologia específica no computador dele e envia um projeto para você, o Docker ajuda a evitar problemas de incompatibilidade ao rodar o mesmo projeto.

# Container
- Um container é o agrupamento de códigos, bibliotecas e dependências de um aplicativo em um ambiente isolado.

# Imagem
- Uma imagem define o ambiente em que um container será executado, ou seja, a tecnologia escolhida (ex: MySQL, Node.js).
- É recomendado abrir o Docker Hub para aprender os comandos específicos para cada imagem.
    - **Docker Hub**: Repositório de imagens (tecnologias).

# Docker Daemon
- O Docker Daemon é o servidor que roda e administra containers.

# Docker Client
- O Docker Client se comunica com o Docker Daemon, enviando comandos para ele.

# Estudar e Criar uma Imagem Docker Personalizada com um Dockerfile
- Crie um arquivo `Dockerfile` no VSCode.

- Exemplo para uma aplicação React:
    ```Dockerfile
    # A imagem da aplicação vai usar a imagem do Node como base
    FROM node:16
    
    # Define o diretório de trabalho (onde será instalada a aplicação)
    WORKDIR /onde/salvar

    # Copia todos os arquivos necessários para a aplicação para dentro do diretório de trabalho
    COPY package*.json ./

    # Instala as dependências
    RUN npm install

    # Copia todos os arquivos do projeto para dentro do container
    COPY . .

    # Expõe a porta do container para acesso externo
    EXPOSE 3000

    # Comando para iniciar a aplicação
    CMD ["npm", "start"]
    ```

- No terminal:
    ```bash
    docker build -t meu_app .
    ```
    - `-t`: Dá um nome para o arquivo (no caso, `meu_app`).
    - `.`: Acessa a raiz do projeto.

# Configurar a Comunicação entre Containers (Ex: Backend e Banco de Dados)
- Primeiro passo: instale extensões no VSCode (ex: Docker, MySQL [Database], etc.).
- Vá ao Docker Hub e baixe a imagem do MySQL.

    ```bash
    docker run --name mysql_container -e MYSQL_ROOT_PASSWORD=root mysql:5.7
    ```
    - `docker run`: Executa um novo container.
    - `-e`: Define uma variável de ambiente.
    - `MYSQL_ROOT_PASSWORD=root`: Configura a senha do MySQL como "root" (você pode escolher a senha).
    - `mysql:5.7`: Define a imagem do MySQL que queremos rodar.

- Aguarde o download da imagem.
- Abra um novo terminal e digite:
    ```bash
    docker ps
    ```
    - `docker ps`: Mostra informações sobre os containers em execução (ID, status, quando foram criados, etc.).

- Para parar um container:
    ```bash
    docker stop <ID-do-container>
    ```
    - Exemplo: `docker stop 3b` (onde "3b" são os primeiros caracteres do ID do container).

- Para listar todos os containers (inclusive os parados):
    ```bash
    docker ps -a
    ```

- Para remover um container:
    ```bash
    docker rm <ID-do-container>
    ```

- **Comunicação entre containers** (Exemplo com MySQL):
    ```bash
    docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:5.7
    ```
    - `-p 3306:3306`: Mapeia a porta `3306` da máquina para a porta `3306` do container.
    - `-d`: Executa o container em segundo plano (background).

# Dev Container
- Extensão do VSCode para trabalhar com containers.
- **Dev Container** (ou “Development Container”) é um ambiente de desenvolvimento isolado que roda dentro de um container Docker. Ele permite configurar um ambiente completo com todas as dependências, ferramentas e configurações necessárias para o desenvolvimento de um projeto, de forma consistente e independente do sistema operacional local.