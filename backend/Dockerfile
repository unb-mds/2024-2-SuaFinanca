# Use a imagem oficial do Node.js v22.12.0 como base
FROM node:22.12.0

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
