# 🚀 Plataforma Completa de Dropshipping

Monorepo completo para plataforma de dropshipping com frontend acessível, backend seguro, workers de importação, autenticação JWT, painel administrativo e notificações push via Firebase.

## 📦 Estrutura do Projeto

```
dropshipping-monorepo/
├── apps/
│   ├── store-frontend/          # Loja (Next.js + Tailwind)
│   └── admin-panel/             # Painel Admin (Next.js + Tailwind)
├── services/
│   ├── api/                     # Backend API (NestJS)
│   └── workers/                 # Workers para importação CSV
├── infra/
│   └── migrations/              # Migrations SQL
├── docker-compose.yml
├── package.json
└── .env.example
```

## 🎯 Funcionalidades

### Frontend Store
- ✅ Registro e Login com JWT
- ✅ Tema claro/escuro
- ✅ Totalmente acessível (ARIA, contraste, teclado)
- ✅ Design responsivo e moderno
- ✅ Página de perfil do usuário
- ✅ Registro automático de device token (Firebase)

### Admin Panel
- ✅ Login admin/fornecedor
- ✅ Dashboard de vendas
- ✅ Gerenciamento de produtos e pedidos
- ✅ Perfil do fornecedor
- ✅ Envio de notificações push
- ✅ Tema claro/escuro e acessibilidade

### Backend API
- ✅ Autenticação JWT (register/login/logout)
- ✅ Controle de roles (admin, supplier, customer)
- ✅ Endpoints REST documentados (Swagger)
- ✅ Registro de tokens de dispositivos
- ✅ Notificações push via Firebase Cloud Messaging
- ✅ CRUD completo de produtos e pedidos
- ✅ Segurança: bcrypt, CORS, JWT

### Workers
- ✅ Importação em massa de produtos via CSV
- ✅ Integração com fornecedores externos (preparado para APIs)

## 🛠️ Tecnologias

- **Backend**: NestJS, PostgreSQL, JWT, Firebase Admin SDK
- **Frontend**: Next.js 14, Tailwind CSS, TypeScript
- **Database**: PostgreSQL 15
- **Container**: Docker & Docker Compose
- **Push Notifications**: Firebase Cloud Messaging

## 🚀 Instalação e Configuração

### 1. Pré-requisitos

- Node.js 18+
- Docker & Docker Compose
- Git

### 2. Clone o repositório

```bash
git clone <repo-url>
cd dropshipping-monorepo
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database
POSTGRES_DB=dropshipping
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua-senha-forte
DATABASE_URL=postgresql://postgres:sua-senha-forte@localhost:5432/dropshipping

# API
JWT_SECRET=sua-chave-secreta-super-segura
API_PORT=3001

# Firebase (obtenha em https://console.firebase.google.com)
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@seu-projeto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key
NEXT_PUBLIC_FIREBASE_VAPID_KEY=sua-vapid-key
```

### 4. Suba os containers Docker

```bash
docker-compose up -d
```

Isso irá iniciar:
- PostgreSQL (porta 5432)
- API Backend (porta 3001)
- Worker (para importações)

### 5. Instale as dependências dos frontends

```bash
# Store Frontend
cd apps/store-frontend
npm install

# Admin Panel
cd ../admin-panel
npm install
```

### 6. Execute o seed do banco de dados

```bash
cd services/api
npm run seed
```

Isso criará um usuário admin:
- **Email**: admin@dropshipping.com
- **Senha**: admin123

⚠️ **IMPORTANTE**: Altere a senha após o primeiro login!

### 7. Inicie os frontends

Em terminais separados:

```bash
# Terminal 1 - Store Frontend (porta 3000)
cd apps/store-frontend
npm run dev

# Terminal 2 - Admin Panel (porta 3002)
cd apps/admin-panel
npm run dev
```

## 📱 Configuração do Firebase Cloud Messaging

### 1. Crie um projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative o Cloud Messaging

### 2. Obtenha as credenciais

**Para o Backend:**
1. Vá em Project Settings > Service Accounts
2. Clique em "Generate New Private Key"
3. Copie os valores para `.env`:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

**Para o Frontend:**
1. Vá em Project Settings > General
2. Em "Your apps", adicione um Web app
3. Copie as configurações para `.env`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - etc.

**Chave VAPID:**
1. Vá em Project Settings > Cloud Messaging
2. Em "Web Push certificates", gere um par de chaves
3. Copie a chave pública para `NEXT_PUBLIC_FIREBASE_VAPID_KEY`

### 3. Service Worker (já configurado)

O service worker para receber notificações já está configurado em:
- `apps/store-frontend/public/firebase-messaging-sw.js`

## 🧪 Testando a Aplicação

### 1. Acesse as aplicações

- **Store**: http://localhost:3000
- **Admin Panel**: http://localhost:3002
- **API Docs**: http://localhost:3001/api/docs

### 2. Teste o fluxo completo

1. **Registre um cliente** na Store
2. **Faça login** e permita notificações
3. **Acesse o Admin Panel** com as credenciais admin
4. **Envie uma notificação** para todos os usuários
5. **Verifique** a notificação no navegador

### 3. Importe produtos via CSV

Crie um arquivo `products.csv`:

```csv
name,description,price,sku,stock
Produto 1,Descrição do produto 1,99.90,PROD-001,100
Produto 2,Descrição do produto 2,149.90,PROD-002,50
```

Execute o worker:

```bash
docker-compose exec worker node import-csv.js /data/products.csv <supplier-id>
```

Substitua `<supplier-id>` pelo ID do usuário fornecedor (obtenha fazendo login no admin).

## 📚 Documentação da API

Acesse http://localhost:3001/api/docs para ver a documentação completa Swagger.

### Endpoints principais:

**Autenticação:**
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login
- `GET /auth/me` - Dados do usuário autenticado

**Produtos:**
- `GET /products` - Listar produtos
- `GET /products/:id` - Detalhes do produto
- `POST /products` - Criar produto (supplier/admin)
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Desativar produto

**Pedidos:**
- `GET /orders` - Listar pedidos
- `GET /orders/:id` - Detalhes do pedido

**Notificações:**
- `GET /notifications` - Listar notificações do usuário
- `POST /notifications/send` - Enviar notificação (admin only)

**Dispositivos:**
- `POST /devices/register` - Registrar token do dispositivo

## 🎨 Customização

### Temas

Os frontends suportam tema claro/escuro automaticamente. O tema é salvo no localStorage.

### Cores

Edite `tailwind.config.js` em cada frontend para customizar:

```js
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...}
    }
  }
}
```

## 🔒 Segurança

- ✅ Senhas hasheadas com bcrypt (10 rounds)
- ✅ JWT com expiração configurável
- ✅ CORS configurado
- ✅ Validação de dados com class-validator
- ✅ Proteção de rotas por roles
- ✅ HTTPS recomendado em produção
- ✅ Variáveis sensíveis em .env

## 🚀 Deploy em Produção

### 1. Configure variáveis de ambiente

```env
NODE_ENV=production
JWT_SECRET=<senha-muito-segura-random>
DATABASE_URL=<sua-database-url-producao>
```

### 2. Build dos frontends

```bash
cd apps/store-frontend
npm run build

cd ../admin-panel
npm run build
```

### 3. Deploy sugerido

- **Backend**: Railway, Heroku, AWS ECS
- **Database**: Railway, Supabase, AWS RDS
- **Frontends**: Vercel, Netlify
- **Containers**: Docker Swarm, Kubernetes

## 📝 Scripts Úteis

```bash
# Root
npm run docker:up          # Subir containers
npm run docker:down        # Parar containers
npm run docker:logs        # Ver logs
npm run seed               # Criar admin user

# API
cd services/api
npm run start:dev          # Dev mode
npm run build              # Build production
npm run start:prod         # Start production

# Frontends
cd apps/store-frontend
npm run dev                # Dev mode
npm run build              # Build
npm run start              # Start production

# Workers
cd services/workers
npm run import             # Import CSV
```

## 🐛 Troubleshooting

### Erro de conexão com banco de dados

```bash
# Verifique se o container está rodando
docker-compose ps

# Recrie os containers
docker-compose down -v
docker-compose up -d
```

### Notificações não funcionam

1. Verifique as credenciais Firebase no `.env`
2. Certifique-se de que HTTPS está habilitado (ou use localhost)
3. Permita notificações no navegador

### Erro de CORS

Adicione a URL do frontend no arquivo `services/api/src/main.ts`:

```typescript
app.enableCors({
  origin: ['http://localhost:3000', 'https://seu-dominio.com'],
  credentials: true,
});
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 📞 Suporte

Para questões e suporte:
- Abra uma issue no GitHub
- Email: support@dropshipping.com

---

**Desenvolvido com ❤️ para a comunidade**
