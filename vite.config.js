import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '0.0.0.0', // Listen on all interfaces
        port: 5173,
        enabled: false
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    base: '/mds/build/', // Change this to the appropriate subpath if needed
    build: {
        // Output directory for your built assets (adjust as needed)
        outDir: 'public/build', // Change this to match your Laravel's public directory
    },
});
