@echo off
cd /d "c:\Users\user\Desktop\G-wealth\gwealth"
npm install --no-audit --no-fund framer-motion recharts react-hook-form clsx lucide-react date-fns
echo INSTALL_EXIT_CODE:%ERRORLEVEL%
pause