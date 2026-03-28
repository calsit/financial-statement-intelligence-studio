@echo off
setlocal
cd /d "%~dp0.."

set "APP_URL=http://localhost:3000"

start "Financial Statement Intelligence Studio Server" cmd /k "cd /d ""%~dp0.."" && node server.js"
timeout /t 2 /nobreak >nul
start "" "%APP_URL%"

endlocal
