@echo off
setlocal EnableExtensions

title ETS2 Dashboard - QuickStart
color 0B

set "ROOT=%~dp0"
set "PROJECT=%ROOT%project"
set "TELEMETRY=%ROOT%telemetry-server"
set "ZIP=%TEMP%\ets2-telemetry-server-3.2.5.zip"

echo.
echo ========================================================
echo                 ETS2 DASHBOARD
echo                    QUICK START
echo ========================================================
echo.
echo This setup will prepare the ETS2 Dashboard on this PC.
echo.
echo The setup will:
echo.
echo   1. Check Node.js and npm
echo   2. Install the dashboard dependencies
echo   3. Download the ETS2 Telemetry Server
echo   4. Prepare the Telemetry Server automatically
echo   5. Guide you through the one-time installation
echo.
echo After this setup you can simply use Start.bat.
echo.
pause


:: ========================================================
:: 1. CHECK NODE.JS AND NPM
:: ========================================================

echo.
echo ========================================================
echo [1/4] Checking Node.js and npm...
echo ========================================================
echo.

where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js was not found.
    echo.
    echo Please install Node.js LTS first:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm was not found.
    echo.
    echo Please reinstall Node.js LTS.
    echo.
    pause
    exit /b 1
)

echo Node.js:
node --version

echo.
echo npm:
call npm --version

if errorlevel 1 (
    echo.
    echo [ERROR] npm could not be started.
    echo.
    pause
    exit /b 1
)


:: ========================================================
:: 2. INSTALL DASHBOARD DEPENDENCIES
:: ========================================================

echo.
echo ========================================================
echo [2/4] Installing dashboard dependencies...
echo ========================================================
echo.

if not exist "%PROJECT%\package.json" (
    echo [ERROR] project\package.json was not found.
    echo.
    echo Please make sure QuickStart.bat is located
    echo in the main ETS2 Dashboard folder.
    echo.
    pause
    exit /b 1
)

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
:: 3. DOWNLOAD AND PREPARE TELEMETRY SERVER
:: ========================================================

echo.
echo ========================================================
echo [3/4] Preparing ETS2 Telemetry Server...
echo ========================================================
echo.

if exist "%TELEMETRY%\server\Ets2Telemetry.exe" (
    echo Telemetry Server already exists.
    goto TELEMETRY_READY
)

echo Downloading official Funbit Telemetry Server...
echo.
echo Source:
echo https://github.com/Funbit/ets2-telemetry-server
echo.

curl.exe -L --fail --silent --show-error ^
-o "%ZIP%" ^
"https://github.com/Funbit/ets2-telemetry-server/archive/refs/tags/3.2.5.zip"

if errorlevel 1 (
    echo.
    echo [ERROR] The Telemetry Server could not be downloaded.
    echo.
    echo Please check your internet connection.
    echo.
    pause
    exit /b 1
)

if not exist "%ZIP%" (
    echo.
    echo [ERROR] The downloaded ZIP file was not found.
    echo.
    pause
    exit /b 1
)

echo.
echo Download completed.
echo.
echo Preparing server files...
echo.

set "ETS2_ZIP=%ZIP%"
set "ETS2_TELEMETRY=%TELEMETRY%"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; Add-Type -AssemblyName System.IO.Compression.FileSystem; $zip=[System.IO.Compression.ZipFile]::OpenRead($env:ETS2_ZIP); try { $destination=[System.IO.Path]::GetFullPath($env:ETS2_TELEMETRY); $serverDestination=[System.IO.Path]::GetFullPath((Join-Path $destination 'server')); New-Item -ItemType Directory -Force -Path $serverDestination; $found=$false; foreach($entry in $zip.Entries) { if($entry.FullName -like '*/server/Ets2Telemetry.exe') { $found=$true; break } }; if(-not $found) { throw 'Ets2Telemetry.exe was not found in the downloaded archive.' }; foreach($entry in $zip.Entries) { $name=$entry.FullName; $marker='/server/'; $index=$name.IndexOf($marker); if($index -ge 0) { $relative=$name.Substring($index + $marker.Length); if($relative.Length -gt 0) { $output=[System.IO.Path]::GetFullPath((Join-Path $serverDestination $relative)); $root=$serverDestination.TrimEnd('\') + '\'; if(-not $output.StartsWith($root,[System.StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe archive path detected.' }; if($name.EndsWith('/')) { New-Item -ItemType Directory -Force -Path $output } else { $parent=Split-Path $output -Parent; New-Item -ItemType Directory -Force -Path $parent; [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry,$output,$true) } } } } } finally { $zip.Dispose() }"

if errorlevel 1 (
    echo.
    echo [ERROR] The Telemetry Server could not be prepared.
    echo.
    del /q "%ZIP%" >nul 2>&1
    pause
    exit /b 1
)

del /q "%ZIP%" >nul 2>&1

if not exist "%TELEMETRY%\server\Ets2Telemetry.exe" (
    echo.
    echo [ERROR] Ets2Telemetry.exe was not found after extraction.
    echo.
    pause
    exit /b 1
)

echo.
echo Telemetry Server prepared successfully.


:: ========================================================
:: 4. ONE-TIME INSTALLATION
:: ========================================================

:TELEMETRY_READY

echo.
echo ========================================================
echo [4/4] One-time Telemetry Server installation
echo ========================================================
echo.
echo The ETS2 Telemetry Server needs to be installed
echo once on this PC.
echo.
echo A new window will now open.
echo.
echo Please do the following:
echo.
echo   1. Start Ets2Telemetry.exe
echo   2. Click "Install"
echo   3. Follow the installation instructions
echo   4. If Windows asks for Administrator permission,
echo      allow it.
echo   5. Wait until the installation is finished.
echo.
echo You only need to do this once.
echo.
echo ========================================================
echo.
pause

start "" "%TELEMETRY%\server\Ets2Telemetry.exe"

echo.
echo ========================================================
echo Telemetry Server started.
echo ========================================================
echo.
echo Complete the installation in the opened window.
echo.
echo When you are finished, return here.
echo.
pause

echo.
echo ============================================================
echo  Browser-Erweiterung erforderlich
echo ============================================================
echo.
echo Das ETS2 Dashboard benoetigt eine CORS-Erweiterung,
echo damit der Browser auf den Telemetry Server zugreifen kann.
echo.
echo Welchen Browser verwendest du?
echo.
echo   Chrome
echo   Firefox
echo   Opera
echo   Edge
echo.
echo Bitte den Namen genau wie oben eingeben.
echo.

set /p "BROWSER=Browser: "

if /I "%BROWSER%"=="Chrome" goto CORS_CHROME
if /I "%BROWSER%"=="Firefox" goto CORS_FIREFOX
if /I "%BROWSER%"=="Opera" goto CORS_OPERA
if /I "%BROWSER%"=="Edge" goto CORS_EDGE

echo.
echo [ERROR] Unbekannter Browser.
echo Bitte QuickStart erneut starten und Chrome, Firefox, Opera oder Edge eingeben.
echo.
pause
exit /b 1


:CORS_CHROME
echo.
echo Chrome ausgewaehlt.
echo Oeffne die CORS-Erweiterung im Chrome Web Store...
start "" "https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf"
goto CORS_DONE


:CORS_FIREFOX
echo.
echo Firefox ausgewaehlt.
echo Oeffne die CORS-Erweiterung bei Firefox Add-ons...
start "" "https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/"
goto CORS_DONE


:CORS_OPERA
echo.
echo Opera ausgewaehlt.
echo Oeffne CORS Toggle bei Opera Add-ons...
start "" "https://addons.opera.com/de/extensions/details/cors-toggle/"
goto CORS_DONE


:CORS_EDGE
echo.
echo Edge ausgewaehlt.
echo Oeffne die CORS-Erweiterung bei Microsoft Edge Add-ons...
start "" "https://microsoftedge.microsoft.com/addons/detail/allow-cors-accesscontro/bhjepjpgngghppolkjdhckmnfphffdag"
goto CORS_DONE


:CORS_DONE
echo.
echo ============================================================
echo  Installation
echo ============================================================
echo.
echo Der Installationsbereich wurde geoeffnet.
echo.
echo 1. Installiere die CORS-Erweiterung.
echo 2. Aktiviere die Erweiterung im Browser.
echo 3. Kehre anschliessend hierher zurueck.
echo.
echo Druecke ENTER, wenn du fertig bist.
pause >nul

echo.
echo CORS-Erweiterung eingerichtet.
echo.


:: ========================================================
:: FINISHED
:: ========================================================

echo.
echo ========================================================
echo                 SETUP COMPLETE
echo ========================================================
echo.
echo The ETS2 Dashboard is now prepared.
echo.
echo From now on, simply double-click:
echo.
echo     Start.bat
echo.
echo Start.bat will:
echo.
echo   - Start the Telemetry Server
echo   - Start the Dashboard
echo   - Open the Dashboard in your browser
echo.
echo ========================================================
echo.

pause
exit /b 0