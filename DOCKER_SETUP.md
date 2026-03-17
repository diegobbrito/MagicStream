# Docker Setup - MagicStream

Guia completo para executar a aplicação MagicStream com Docker Compose.

## 📋 Pré-requisitos

- Docker (v20.10+)
- Docker Compose (v1.29+)
- ou Docker Desktop

## 🚀 Início Rápido

### 1. Clonar e navegar para o projeto
```bash
cd MagicStream
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` se necessário para alterar credenciais e portas.

### 3. Construir as imagens
```bash
docker-compose build
```

### 4. Iniciar os serviços
```bash
docker-compose up -d
```

### 5. Verificar status
```bash
docker-compose ps
```

Aguarde alguns segundos para que o MongoDB esteja pronto.

## 📱 Acessar a aplicação

- **Cliente (React)**: http://localhost:5173
- **Servidor (Go API)**: http://localhost:8080
- **MongoDB**: mongodb://admin:password123@localhost:27017

## 📊 Visualizar logs

```bash
# Todos os serviços
docker-compose logs -f

# Servidor especifico
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f mongodb
```

## 🛑 Parar e remover

```bash
# Only stop (containers permanecem)
docker-compose stop

# Parar e remover containers
docker-compose down

# Remover containers, volumes e redes
docker-compose down -v
```

## 🔄 Reiniciar

```bash
docker-compose restart
```

## 🐛 Troubleshooting

### Porta já está em uso
Se uma porta já está em uso, edite o `.env`:
```bash
SERVER_PORT=8081
CLIENT_PORT=5174
MONGO_PORT=27018
```

### MongoDB não conecta
Verifique se o MongoDB está saudável:
```bash
docker-compose ps
```

Se o status não é "Up", visualize os logs:
```bash
docker-compose logs mongodb
```

### Cliente não consegue acessar o servidor
Verifique `VITE_API_BASE_URL` no `.env` ou check CORS no servidor.

### Reconstruir uma imagem
```bash
docker-compose build --no-cache server
```

## 📦 Estrutura dos Serviços

### MongoDB
- **Imagem**: mongo:7.0
- **Porta**: 27017
- **Volume**: mongodb_data (persistência)
- **Credenciais**: admin/password123 (configurável)

### Server (Go)
- **Build**: Multi-stage (otimizado)
- **Porta**: 8080
- **Conectado a**: MongoDB
- **Health Check**: Não implementado por padrão

### Client (React)
- **Build**: Vite + Node.js multi-stage
- **Porta**: 5173
- **Build Arg**: VITE_API_BASE_URL

## 🔐 Produção

Para produção, altere em `.env`:
```bash
MONGO_ROOT_PASSWORD=senha-complexa-aqui
JWT_SECRET=chave-secreta-complexa-aqui
ALLOWED_ORIGINS=sua-dominio.com,www.sua-dominio.com
```

## 📝 Makefile Commands

Se disponível no projeto:
```bash
make help       # Ver todos os comandos
make build      # Build das imagens
make up         # Iniciar serviços
make down       # Parar serviços
make logs       # Visualizar logs
make clean      # Limpar tudo
```

## 🔗 Network

Todos os serviços estão na rede `magicstream-network` (bridge), permitindo comunicação interna:
- Server acessa MongoDB via: `mongodb://admin:password123@mongodb:27017`
- Client acessa Server via: `http://server:8080` (interno) ou `http://localhost:8080` (externo)
