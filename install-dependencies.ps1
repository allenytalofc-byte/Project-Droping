# Script para instalar todas as dependências do monorepo
Write-Host "Instalando dependências do monorepo..." -ForegroundColor Green

# API
Write-Host "`nInstalando dependências da API..." -ForegroundColor Yellow
Set-Location "services/api"
npm install
Set-Location "../.."

# Workers
Write-Host "`nInstalando dependências dos Workers..." -ForegroundColor Yellow
Set-Location "services/workers"
npm install
Set-Location "../.."

# Store Frontend
Write-Host "`nInstalando dependências do Store Frontend..." -ForegroundColor Yellow
Set-Location "apps/store-frontend"
npm install
Set-Location "../.."

# Admin Panel
Write-Host "`nInstalando dependências do Admin Panel..." -ForegroundColor Yellow
Set-Location "apps/admin-panel"
npm install
Set-Location "../.."

Write-Host "`n✅ Todas as dependências foram instaladas!" -ForegroundColor Green
Write-Host "Os erros de TypeScript devem estar resolvidos agora." -ForegroundColor Green
