@echo off
title Compilar Sistema de Matriculas

set "ROOT=C:\Users\jerem\Documents\SanFraciscoJardin\matriculas"
set "FRONTEND=%ROOT%\src\main\java\matriculas\Code\frontend\Cliente"
set "STATIC=%ROOT%\src\main\resources\static"
set "JAVA_HOME=C:\Program Files\Java\jdk-21"
set "PATH=%JAVA_HOME%\bin;%PATH%"

cd /d "%ROOT%"

echo Compilando frontend...
cd /d "%FRONTEND%"
call npm run build
if errorlevel 1 (
    echo.
    echo Error: no se pudo compilar el frontend.
    pause
    exit /b 1
)

echo Copiando frontend al backend...
if not exist "%STATIC%" mkdir "%STATIC%"
xcopy "%FRONTEND%\dist\*" "%STATIC%\" /E /I /Y > nul
if errorlevel 1 (
    echo.
    echo Error: no se pudo copiar el frontend compilado.
    pause
    exit /b 1
)

echo Empaquetando aplicacion...
cd /d "%ROOT%"
call mvnw.cmd package -DskipTests
if errorlevel 1 (
    echo.
    echo Error: no se pudo generar el archivo jar.
    pause
    exit /b 1
)

echo.
echo Aplicacion compilada correctamente.
pause
exit