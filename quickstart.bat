@echo off
setlocal EnableExtensions

title ETS2 Dashboard - QuickStart
color 0B

echo.
echo ========================================================
echo                 ETS2 DASHBOARD
echo                    QUICK START
echo ========================================================
echo.
echo This script prepares the ETS2 Dashboard on this PC.
echo.
echo It will:
echo   1. Check Node.js and npm
echo   2. Install dashboard dependencies
echo   3. Download Telemetry Server 3.2.5
echo   4. Extract it locally
echo.
echo You will still need to perform the Telemetry Server
echo installation once yourself.
echo.
pause

set "ROOT=%~dp0"
set "PROJECT=%ROOT%project"
set "TELEMETRY=%ROOT%telemetry-server"
set "TEMP_ZIP=%TEMP%\ets2-telemetry-server-3.2.5.zip"
set "TEMP_DIR=%TEMP%\ets2-telemetry-server-3.2.5"

:: ========================================================
:: Check project
:: ========================================================

if not exist "%PROJECT%\package.json" (
    echo.
    echo [ERROR] project\package.json was not found.
    echo.
    echo Make sure QuickStart.bat is next to the project folder.
    echo.
    pause
    exit /b 1
)

:: ========================================================
:: Check Node.js
:: ========================================================

echo.
echo [1/4] Checking Node.js...

where node >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js is not installed.
    echo.
    echo Please install Node.js LTS and run this script again.
    echo.
    echo Official website:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] npm was not found.
    echo.
    echo Please reinstall Node.js LTS.
    echo.
    pause
    exit /b 1
)

echo Node.js:
node --version

echo npm:
npm --version

:: ========================================================
:: Install dashboard dependencies
:: ========================================================

echo.
echo [2/4] Installing dashboard dependencies...
echo.

cd /d "%PROJECT%"

call npm install

if errorlevel 1 (
    echo.
    echo [ERROR] npm install failed.
    echo.
    pause
    exit /b 1
)

echo.
echo Dashboard dependencies installed successfully.

:: ========================================================
:: Download fixed Telemetry Server version
:: ========================================================

echo.
echo [3/4] Preparing Telemetry Server 3.2.5...
echo.
echo Source:
echo https://github.com/Funbit/ets2-telemetry-server
echo Version: 3.2.5
echo.

if exist "%TELEMETRY%\server\Ets2Telemetry.exe" (
    echo Telemetry Server 3.2.5 is already installed locally.
    goto TELEMETRY_READY
)

if exist "%TEMP_ZIP%" del /q "%TEMP_ZIP%" >nul 2>&1
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%" >nul 2>&1

echo Downloading Telemetry Server 3.2.5...

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri 'https://github.com/Funbit/ets2-telemetry-server/archive/refs/tags/3.2.5.zip' -OutFile '%TEMP_ZIP%'"

if errorlevel 1 (
    echo.
    echo [ERROR] Download failed.
    echo.
    echo Please check your internet connection.
    echo.
    pause
    exit /b 1
)

if not exist "%TEMP_ZIP%" (
    echo.
    echo [ERROR] Download file was not created.
    echo.
    pause
    exit /b 1
)

echo Extracting...

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "Expand-Archive -LiteralPath '%TEMP_ZIP%' -DestinationPath '%TEMP_DIR%' -Force"

if errorlevel 1 (
    echo.
    echo [ERROR] Could not extract the Telemetry Server.
    echo.
    pause
    exit /b 1
)

if not exist "%TEMP_DIR%\ets2-telemetry-server-3.2.5\server\Ets2Telemetry.exe" (
    echo.
    echo [ERROR] Unexpected Telemetry Server structure.
    echo.
    echo The downloaded version may have changed.
    echo.
    pause
    exit /b 1
)

move "%TEMP_DIR%\ets2-telemetry-server-3.2.5" "%TELEMETRY%" >nul

if errorlevel 1 (
    echo.
    echo [ERROR] Could not move the Telemetry Server.
    echo.
    pause
    exit /b 1
)

del /q "%TEMP_ZIP%" >nul 2>&1
rmdir /s /q "%TEMP_DIR%" >nul 2>&1

:TELEMETRY_READY

echo.
echo Telemetry Server 3.2.5 is ready.

:: ========================================================
:: One-time installation
:: ========================================================

echo.
echo [4/4] One-time Telemetry Server setup
echo.
echo ========================================================
echo                    IMPORTANT
echo ========================================================
echo.
echo You now need to install the Telemetry Server once.
echo.
echo The server folder will be opened for you.
echo.
echo 1. Open Ets2Telemetry.exe
echo 2. Use the Install option
echo 3. Follow the installation instructions
echo 4. Windows may request Administrator permission
echo 5. Complete the installation
echo.
echo This is required because the Telemetry Server installs
echo its ETS2 telemetry plugin and configures its local
echo web service.
echo.
echo ========================================================
echo.

start "" "%TELEMETRY%\server"

echo.
echo The Telemetry Server folder has been opened.
echo.
echo Complete the installation in Ets2Telemetry.exe.
echo.
pause

echo.
echo ========================================================
echo                 QUICK START COMPLETE
echo ========================================================
echo.
echo You can now use Start.bat whenever you want to run
echo the ETS2 Dashboard.
echo.
pause

exit /b 0