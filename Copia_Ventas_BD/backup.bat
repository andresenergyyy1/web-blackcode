@echo off
set USER=root
set PASSWORD=Rex#2023
set DATABASE=VentasBD
set BACKUP_DIR=%~dp0

:: Crear un nombre de archivo con la fecha
set BACKUP_FILE=%BACKUP_DIR%VentasBD_%DATE:~-4,4%-%DATE:~-10,2%-%DATE:~-7,2%.sql

:: Realizar el backup
"C:\Program Files\MySQL\MySQL Server 9.0\bin\mysqldump.exe" -u %USER% -p%PASSWORD% -P 3307 %DATABASE% > "%BACKUP_FILE%"
