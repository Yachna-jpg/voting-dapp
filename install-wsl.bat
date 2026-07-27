@echo off
echo ========================================
echo Midnight Voting DApp - WSL Setup Script
echo ========================================
echo.
echo This script will help you set up WSL for Compact compiler
echo.
echo STEP 1: Enabling WSL Windows Feature
echo -------------------------------------
echo.

echo Running: dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

if %errorlevel% == 0 (
    echo.
    echo SUCCESS: WSL feature enabled!
    echo.
    echo IMPORTANT: You need to RESTART your computer now.
    echo After restart, Ubuntu will install automatically.
    echo.
    echo When Ubuntu opens:
    echo   1. Create a username (e.g., yachna)
    echo   2. Create a password (you won't see characters while typing)
    echo   3. Wait for installation to complete
    echo.
    echo Then run: install-compact.sh
    echo.
    pause
) else (
    echo.
    echo ERROR: Failed to enable WSL
    echo.
    echo Please run this script as Administrator:
    echo   1. Right-click on this script
    echo   2. Select "Run as administrator"
    echo.
    pause
)
