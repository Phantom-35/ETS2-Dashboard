@echo off
setlocal

title ETS2 Dashboard
color 0B

echo.
echo ==========================================
echo        ETS2 DASHBOARD - START
echo ==========================================
echo.

set "ROOT=%~dp0"
set "PROJECT=%ROOT%project"
set "TELEMETRY=%ROOT%telemetry-server"

:: Check Telemetry Server
if not exist "%TELEMETRY%\server\Ets2Telemetry.exe" (
    echo [ERROR] Telemetry Server 3.2.5 was not found.
    echo.
    echo Please run QuickStart.bat first.
    echo.
    pause
    exit /b 1
)

:: Check dashboard
if not exist "%PROJECT%\package.json" (
    echo [ERROR] Dashboard project was not found.
    echo.
    pause
    exit /b 1
)

echo [1/3] Starting Telemetry Server...
start "" "%TELEMETRY%\server\Ets2Telemetry.exe"

timeout /t 2 /nobreak >nul

echo [2/3] Starting Dashboard...
cd /d "%PROJECT%"
start /min cmd /c "npm run dev"

echo [3/3] Waiting for dashboard...
timeout /t 5 /nobreak >nul

echo.
echo Opening dashboard...
start "" "http://localhost:5173"

echo.
echo ==========================================
echo          SYSTEM READY - HAVE FUN!
echo ==========================================
echo.
pause