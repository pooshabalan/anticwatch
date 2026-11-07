@echo off
call npm install next@14.2.15 react@18 react-dom@18 framer-motion lucide-react clsx tailwind-merge
call npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer eslint eslint-config-next
call npx tailwindcss init -p
