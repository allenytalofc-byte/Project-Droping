# 🚀 Guia de Início Rápido - Plataforma Dropshipping

Este guia permite que você configure e execute o projeto em **menos de 10 minutos**.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Docker e Docker Compose instalados
- Git instalado

## ⚡ Configuração Rápida

### 1. Clone e Configure

```bash
# Clone o repositório
cd dropshipping-monorepo

# Copie o arquivo de ambiente
cp .env.example .env

# IMPORTANTE: Edite o .env e configure pelo menos:
# - JWT_SECRET=sua-chave-secreta-aqui
# - POSTGRES_PASSWORD=sua-senha-forte
```

### 2. Suba o Backend com Docker

```bash
# Inicia PostgreSQL, API e Worker
docker-compose up -d

# Aguarde ~30 segundos para o banco inicializar
# Verifique os logs
docker-compose logs -f
```

### 3. Instale Dependências dos Frontends

```bash
# Store Frontend
cd apps/store-frontend
npm install

# Volte para a raiz
cd ../..

# Admin Panel
cd apps/admin-panel
npm install

# Volte para a raiz
cd ../..
```

### 4. Crie o Usuário Admin

```bash
cd services/api
npm install
npm run seed
```

**Credenciais criadas:**
- Email: `admin@dropshipping.com`
- Senha: `admin123`

### 5. Inicie os Frontends

**Terminal 1 - Store (porta 3000):**
```bash
cd apps/store-frontend
npm run dev
```

**Terminal 2 - Admin Panel (porta 3002):**
```bash
cd apps/admin-panel
npm run dev
```

## 🎉 Pronto!

Acesse:
- **Store**: http://localhost:3000
- **Admin Panel**: http://localhost:3002
- **API Docs**: http://localhost:3001/api/docs

## 🧪 Testando

### 1. Teste a Store

1. Acesse http://localhost:3000
2. Clique em "Registrar"
3. Crie uma conta de cliente
4. Faça login

### 2. Teste o Admin Panel

1. Acesse http://localhost:3002
2. Faça login com:
   - Email: `admin@dropshipping.com`
   - Senha: `admin123`
3. Explore o dashboard

### 3. Teste a API

1. Acesse http://localhost:3001/api/docs
2. Explore os endpoints disponíveis
3. Teste com "Try it out"

## 🔥 Firebase (Opcional para Notificações Push)

Se quiser testar notificações push:

1. Crie um projeto em https://console.firebase.google.com
2. Obtenha as credenciais
3. Atualize o `.env` com as chaves do Firebase
4. Reinicie os serviços: `docker-compose restart`

## 📚 Próximos Passos

- Leia o [README.md](./README.md) completo para entender a arquitetura
- Explore o código fonte em `services/api/src/`
- Customize os frontends em `apps/`
- Adicione seus próprios produtos

## 🐛 Problemas Comuns

**Erro: Porta já em uso**
```bash
# Mude as portas no docker-compose.yml ou .env
```

**Erro: Cannot connect to database**
```bash
# Recrie os containers
docker-compose down -v
docker-compose up -d
```

**Frontend não conecta na API**
```bash
# Verifique o .env
# NEXT_PUBLIC_API_URL deve ser http://localhost:3001
```

## 📞 Ajuda

- Consulte o [README.md](./README.md) para documentação completa
- Veja os logs: `docker-compose logs -f`
- Verifique a saúde dos containers: `docker-compose ps`

---

**Aproveite sua plataforma de dropshipping! 🎊**
