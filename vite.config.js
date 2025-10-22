import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    server: {
        host: "0.0.0.0",
        https: {
            key: fs.readFileSync(path.resolve(__dirname, '172.20.10.2+3-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, '172.20.10.2+3.pem')),
        },
        cors: true,
        watch: {
            usePolling: true,
        },
        strictPort: true,
        port: 3000,
    },
});