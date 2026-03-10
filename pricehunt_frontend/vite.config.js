import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        host: '0.0.0.0',
        allowedHosts: ['.kavia.ai'],
        port: 3000,
        strictPort: true,
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        watch: {
            usePolling: true
        },
        // Proxy API requests to the backend to avoid CORS and certificate issues.
        // All requests to /compare-prices and /health are forwarded to the backend
        // running on port 3001 via HTTP (internal network), bypassing HTTPS cert issues.
        proxy: {
            '/compare-prices': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
            },
            '/health': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
            },
        },
    }
})
