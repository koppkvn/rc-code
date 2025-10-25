import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.js'),
            name: 'RCCode',
            fileName: 'main',
            formats: ['iife']
        },
        rollupOptions: {
            output: {
                entryFileNames: 'main.js',
                assetFileNames: 'main.[ext]'
            }
        }
    },
    server: {
        host: "0.0.0.0",
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'localhost+1-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'localhost+1.pem')),
        },
        cors: true,
        watch: {
            usePolling: true,
        },
        strictPort: true,
        port: 3000,
    },
});
