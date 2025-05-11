# Script para configurar o ambiente Android
Write-Host "Configurando ambiente Android para o projeto..." -ForegroundColor Green

# Verificar se o Java está instalado
Write-Host "Verificando instalação do Java..." -ForegroundColor Yellow
$javaPath = "C:\Program Files\Java\jdk-21"
if (!(Test-Path $javaPath)) {
    Write-Host "Java JDK 21 não encontrado em $javaPath" -ForegroundColor Red
    Write-Host "Por favor, instale o JDK 21 do site oficial: https://www.oracle.com/java/technologies/downloads/#java21" -ForegroundColor Red
    exit 1
}

# Configurar JAVA_HOME
Write-Host "Configurando JAVA_HOME..." -ForegroundColor Yellow
$env:JAVA_HOME = $javaPath
[Environment]::SetEnvironmentVariable("JAVA_HOME", $javaPath, "User")

# Verificar se o Android Studio está instalado
Write-Host "Verificando instalação do Android Studio..." -ForegroundColor Yellow
$androidStudioPath = "C:\Program Files\Android\Android Studio"
if (!(Test-Path $androidStudioPath)) {
    Write-Host "Android Studio não encontrado. Por favor, instale o Android Studio." -ForegroundColor Red
    exit 1
}

# Configurar variáveis de ambiente
Write-Host "Configurando variáveis de ambiente..." -ForegroundColor Yellow
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $env:ANDROID_HOME, "User")

# Adicionar ao PATH
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\tools\bin;$env:PATH"
[Environment]::SetEnvironmentVariable("PATH", $env:PATH, "User")

# Verificar se o Android SDK está instalado
if (!(Test-Path $env:ANDROID_HOME)) {
    Write-Host "Android SDK não encontrado. Por favor, instale o Android SDK através do Android Studio." -ForegroundColor Red
    exit 1
}

# Instalar dependências do projeto
Write-Host "Instalando dependências do projeto..." -ForegroundColor Yellow
npm install

# Configurar o projeto para Android
Write-Host "Configurando o projeto para Android..." -ForegroundColor Yellow
npx expo prebuild --clean

Write-Host "`nConfiguração concluída! Para rodar o projeto:" -ForegroundColor Green
Write-Host "1. Abra o Android Studio" -ForegroundColor Cyan
Write-Host "2. Abra o projeto na pasta 'android'" -ForegroundColor Cyan
Write-Host "3. Execute o projeto usando o comando: npm run android" -ForegroundColor Cyan 