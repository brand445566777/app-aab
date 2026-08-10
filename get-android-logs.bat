@echo off
title Android React Native Error Logger
echo =================================================================
echo 📱 REAL-TIME ANDROID RUNTIME CRASH LOG CAPTURER 📱
echo =================================================================
echo.
echo Instructions:
echo 1. Connect your Android phone to your PC via USB.
echo 2. Make sure "USB Debugging" is ENABLED in Developer Options.
echo 3. Open the app on your phone to trigger the blank white screen.
echo 4. Wait 10 seconds, then press Ctrl+C in this terminal to stop.
echo.
echo 📝 Errors will be saved to "android-runtime-errors.txt" in this folder.
echo =================================================================
echo.
echo Searching for connected Android devices...
adb devices
echo.
echo Capturing error logs... Press Ctrl+C to stop when done.
adb logcat *:E | findstr /i "fatal exception reactnative javascript exception crash" > "%~dp0android-runtime-errors.txt"
echo.
echo ✅ Done! Logs saved. Please open "android-runtime-errors.txt" and paste any errors here.
pause