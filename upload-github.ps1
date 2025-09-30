# Script para Upload do Projeto no GitHub
# Execute: .\upload-github.ps1

Write-Host "🚀 Preparando projeto para upload no GitHub..." -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git instalado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não está instalado!" -ForegroundColor Red
    Write-Host "Baixe em: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📋 Passo 1: Inicializando repositório Git..." -ForegroundColor Yellow

# Verificar se já existe repositório Git
if (Test-Path ".git") {
    Write-Host "⚠️  Repositório Git já existe!" -ForegroundColor Yellow
    $resposta = Read-Host "Deseja reinicializar? (s/n)"
    if ($resposta -eq "s") {
        Remove-Item -Path ".git" -Recurse -Force
        git init
        Write-Host "✅ Repositório reinicializado" -ForegroundColor Green
    }
} else {
    git init
    Write-Host "✅ Repositório Git inicializado" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Passo 2: Adicionando arquivos..." -ForegroundColor Yellow
git add .
Write-Host "✅ Arquivos adicionados" -ForegroundColor Green

Write-Host ""
Write-Host "📋 Passo 3: Fazendo commit inicial..." -ForegroundColor Yellow
git commit -m "Initial commit: Complete dropshipping monorepo platform

- NestJS backend with JWT auth, roles, and FCM
- PostgreSQL database with complete schema
- Next.js store frontend and admin panel
- CSV import workers
- Docker Compose setup
- Complete documentation"

Write-Host "✅ Commit realizado" -ForegroundColor Green

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📌 AGORA VOCÊ PRECISA:" -ForegroundColor White -BackgroundColor DarkBlue
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Criar um repositório no GitHub:" -ForegroundColor Yellow
Write-Host "   👉 Acesse: https://github.com/new" -ForegroundColor White
Write-Host ""
Write-Host "2️⃣  Preencha os dados:" -ForegroundColor Yellow
Write-Host "   📝 Repository name: dropshipping-monorepo" -ForegroundColor White
Write-Host "   📝 Description: Complete dropshipping platform with NestJS backend" -ForegroundColor White
Write-Host "   📝 Visibility: Public ou Private (sua escolha)" -ForegroundColor White
Write-Host "   ❌ NÃO marque 'Initialize with README'" -ForegroundColor Red
Write-Host "   ❌ NÃO adicione .gitignore ou license" -ForegroundColor Red
Write-Host ""
Write-Host "3️⃣  Clique em 'Create repository'" -ForegroundColor Yellow
Write-Host ""
Write-Host "4️⃣  Copie a URL do seu repositório" -ForegroundColor Yellow
Write-Host "   Exemplo: https://github.com/SEU-USUARIO/dropshipping-monorepo.git" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Solicitar URL do repositório
$repoUrl = Read-Host "Cole aqui a URL do seu repositório GitHub"

if ($repoUrl) {
    Write-Host ""
    Write-Host "📋 Passo 4: Conectando ao GitHub..." -ForegroundColor Yellow
    
    try {
        git remote add origin $repoUrl
        Write-Host "✅ Repositório conectado" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "📋 Passo 5: Fazendo upload (push)..." -ForegroundColor Yellow
        Write-Host "⚠️  Você pode precisar fazer login no GitHub..." -ForegroundColor Yellow
        
        git branch -M main
        git push -u origin main
        
        Write-Host ""
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host "✅ SUCESSO! Projeto enviado para o GitHub!" -ForegroundColor White -BackgroundColor DarkGreen
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host ""
        Write-Host "🌐 Acesse seu projeto em:" -ForegroundColor Cyan
        Write-Host "   $repoUrl" -ForegroundColor White
        Write-Host ""
        
        # Abrir navegador
        Start-Process $repoUrl.Replace(".git", "")
        
    } catch {
        Write-Host ""
        Write-Host "❌ Erro ao fazer upload:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        Write-Host ""
        Write-Host "💡 Tente novamente manualmente:" -ForegroundColor Yellow
        Write-Host "   git remote add origin $repoUrl" -ForegroundColor White
        Write-Host "   git branch -M main" -ForegroundColor White
        Write-Host "   git push -u origin main" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "⚠️  Upload cancelado. Execute novamente quando criar o repositório." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Para fazer upload depois, execute:" -ForegroundColor Cyan
    Write-Host "   git remote add origin URL-DO-SEU-REPOSITORIO" -ForegroundColor White
    Write-Host "   git branch -M main" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
