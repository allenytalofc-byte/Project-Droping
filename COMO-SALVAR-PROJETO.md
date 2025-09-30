# 💾 Como Salvar e Gerenciar Seu Projeto

## 📍 Localização Atual

Seu projeto **JÁ ESTÁ SALVO** localmente em:

```
C:\Users\ytalo\Desktop\dropshipping-monorepo
```

## 📂 Estrutura Completa do Projeto

```
dropshipping-monorepo/
├── apps/
│   ├── store-frontend/        # Frontend da loja
│   └── admin-panel/           # Painel administrativo
├── services/
│   ├── api/                   # Backend NestJS
│   └── workers/               # Workers de importação
├── infra/
│   └── migrations/            # Migrações SQL
├── .gitignore
├── docker-compose.yml
├── package.json
├── README.md
├── QUICKSTART.md
├── ERROS-TYPESCRIPT.md
├── install-dependencies.ps1
└── .env.example
```

## 🔄 Opções para Backup/Versionamento

### Opção 1: GitHub (Recomendado) ⭐

```powershell
# 1. Inicialize o repositório Git
cd Desktop\dropshipping-monorepo
git init

# 2. Adicione todos os arquivos
git add .

# 3. Faça o primeiro commit
git commit -m "Initial commit: Complete dropshipping platform"

# 4. Crie um repositório no GitHub
# Vá para: https://github.com/new

# 5. Conecte ao GitHub (substitua com seu repositório)
git remote add origin https://github.com/SEU-USUARIO/dropshipping-monorepo.git
git branch -M main
git push -u origin main
```

### Opção 2: Backup em Zip 📦

```powershell
# Crie um arquivo zip do projeto
cd Desktop
Compress-Archive -Path dropshipping-monorepo -DestinationPath dropshipping-backup.zip

# O backup estará em: C:\Users\ytalo\Desktop\dropshipping-backup.zip
```

### Opção 3: Copiar para Outro Local 📁

```powershell
# Copiar para Documentos
Copy-Item -Path "Desktop\dropshipping-monorepo" -Destination "$HOME\Documents\dropshipping-monorepo" -Recurse

# Copiar para OneDrive (se tiver)
Copy-Item -Path "Desktop\dropshipping-monorepo" -Destination "$HOME\OneDrive\dropshipping-monorepo" -Recurse

# Copiar para um pen drive (substitua E: pela letra do seu drive)
Copy-Item -Path "Desktop\dropshipping-monorepo" -Destination "E:\dropshipping-monorepo" -Recurse
```

### Opção 4: Backup na Nuvem ☁️

**Google Drive:**
1. Instale o Google Drive no PC
2. Copie a pasta para: `C:\Users\ytalo\Google Drive\`

**Dropbox:**
1. Instale o Dropbox
2. Copie a pasta para: `C:\Users\ytalo\Dropbox\`

**OneDrive:**
1. Já vem instalado no Windows
2. Copie para: `C:\Users\ytalo\OneDrive\`

## 🎯 Workflow Recomendado

### 1. Versionamento com Git

```powershell
# Sempre que fizer mudanças importantes:
git add .
git commit -m "Descrição das mudanças"
git push

# Ver histórico
git log --oneline

# Voltar para versão anterior se necessário
git checkout HASH-DO-COMMIT
```

### 2. Backup Regular

```powershell
# Execute semanalmente (ou quando fizer grandes mudanças)
cd Desktop
$date = Get-Date -Format "yyyy-MM-dd"
Compress-Archive -Path dropshipping-monorepo -DestinationPath "dropshipping-backup-$date.zip"
```

### 3. Automatizar Backup

Crie um script `backup-automatico.ps1`:

```powershell
$projectPath = "$HOME\Desktop\dropshipping-monorepo"
$backupPath = "$HOME\Desktop\Backups"
$date = Get-Date -Format "yyyy-MM-dd-HHmm"

# Cria pasta de backup se não existir
if (-not (Test-Path $backupPath)) {
    New-Item -ItemType Directory -Path $backupPath
}

# Cria o backup
$zipName = "dropshipping-backup-$date.zip"
Compress-Archive -Path $projectPath -DestinationPath "$backupPath\$zipName"

Write-Host "✅ Backup criado: $backupPath\$zipName" -ForegroundColor Green
```

Execute quando quiser:
```powershell
.\backup-automatico.ps1
```

## 📊 Tamanho do Projeto

**Sem node_modules**: ~500 KB (apenas código)  
**Com node_modules**: ~400-600 MB (após npm install)

💡 **Dica**: Use Git/GitHub para versionar. O `.gitignore` já ignora `node_modules` automaticamente!

## 🔐 Segurança

### Nunca Versionar Dados Sensíveis

O arquivo `.gitignore` já protege:
- ✅ `.env` (senhas, tokens)
- ✅ `node_modules/` (pacotes)
- ✅ `firebase-adminsdk.json` (credenciais Firebase)
- ✅ Dados do banco (`postgres-data/`)

### Sempre Use `.env.example`

```powershell
# ✅ Correto: Versione o template
git add .env.example
git commit -m "Add env template"

# ❌ NUNCA faça isso:
git add .env  # Contém dados sensíveis!
```

## 📱 Acessar de Outro Computador

### Usando GitHub:

```powershell
# No outro computador:
git clone https://github.com/SEU-USUARIO/dropshipping-monorepo.git
cd dropshipping-monorepo

# Configure o .env
cp .env.example .env
# Edite o .env com suas configurações

# Instale dependências
.\install-dependencies.ps1

# Pronto para usar!
```

## 🆘 Recuperar Projeto

### Se perder o projeto:

**Do GitHub:**
```powershell
git clone https://github.com/SEU-USUARIO/dropshipping-monorepo.git
```

**Do Backup:**
```powershell
Expand-Archive -Path dropshipping-backup.zip -DestinationPath Desktop\dropshipping-monorepo
```

## ✅ Checklist de Backup

- [ ] Projeto salvo no Desktop
- [ ] Repositório Git inicializado
- [ ] Enviado para GitHub
- [ ] Backup zip criado
- [ ] Cópia em OneDrive/Google Drive
- [ ] `.env` NÃO versionado
- [ ] `.gitignore` configurado

## 📞 Comandos Úteis

```powershell
# Verificar tamanho do projeto
Get-ChildItem Desktop\dropshipping-monorepo -Recurse | Measure-Object -Property Length -Sum

# Listar arquivos grandes
Get-ChildItem Desktop\dropshipping-monorepo -Recurse | Sort-Object Length -Descending | Select-Object -First 10

# Verificar se Git está inicializado
cd Desktop\dropshipping-monorepo
git status
```

## 🎯 Recomendação Final

**Melhor opção**: Use **GitHub** para versionamento + **Backup zip semanal**

1. ✅ Mantenha no GitHub (versionamento)
2. ✅ Backup zip a cada mudança grande
3. ✅ Cópia na nuvem (OneDrive/Google Drive)
4. ✅ Pen drive para segurança extra

---

**Seu projeto está seguro e salvo em** `C:\Users\ytalo\Desktop\dropshipping-monorepo` 🎉
