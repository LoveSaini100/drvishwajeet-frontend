import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.warn('⚠️ Proxy error connecting to backend (port 5000):', err.message);
            if (res.writeHead && !res.headersSent) {
              res.writeHead(503, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify({
                success: false,
                message: 'Backend server is offline on port 5000. Please start the backend server (`cd backend && npm start` or `npm start` from root).'
              }));
            }
          });
        }
      }
    }
  }
});
