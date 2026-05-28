@echo off
title Sistema de Matriculas

set "ROOT=%~dp0"

:find_root
if exist "%ROOT%pom.xml" goto root_found
for %%I in ("%ROOT%..") do set "ROOT=%%~fI\"
if "%ROOT%"=="%SystemDrive%\" exit /b 1
goto find_root

:root_found

cd /d "%ROOT%"

if not exist "target\matriculas-0.0.1-SNAPSHOT.jar" (
    exit /b 1
)

set "JAVA_EXE=%JAVA_HOME%\bin\javaw.exe"
if not exist "%JAVA_EXE%" set "JAVA_EXE=C:\Program Files\Java\jdk-21\bin\javaw.exe"
if not exist "%JAVA_EXE%" set "JAVA_EXE=javaw.exe"

start "" "%JAVA_EXE%" -jar "target\matriculas-0.0.1-SNAPSHOT.jar"
exit /b 0
