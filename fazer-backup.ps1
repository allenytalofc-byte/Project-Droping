# Script Rápido para Backup do Projeto
# Execute: .\fazer-backup.ps1

Write-Host "🔄 Criando backup do projeto..." -ForegroundColor Cyan

# Obter data e hora atual
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmm"
$projectName = "dropshipping-monorepo"
$backupName = "$projectName-backup-$timestamp.zip"

# Caminho do projeto e do backup
$projectPath = $PSScriptRoot
$desktopPath = [Environment]::GetFolderPath("Desktop")
$backupPath = Join-Path $desktopPath $backupName

try {
    # Criar o arquivo zip
    Write-Host "📦 Comprimindo arquivos..." -ForegroundColor Yellow
    Compress-Archive -Path $projectPath -DestinationPath $backupPath -Force
    
    # Mostrar informações do backup
    $backupSize = (Get-Item $backupPath).Length / 1MB
    $backupSizeFormatted = [math]::Round($backupSize, 2)
    
    Write-Host ""
    Write-Host "✅ Backup criado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Localização: $backupPath" -ForegroundColor White
    Write-Host "📊 Tamanho: $backupSizeFormatted MB" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Dica: Copie este arquivo para um pen drive ou nuvem!" -ForegroundColor Cyan
    
    # Abrir a pasta do Desktop
    Start-Process "explorer.exe" -ArgumentList $desktopPath
    
} catch {
    Write-Host ""
    Write-Host "❌ Erro ao criar backup: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    exit 1
}
