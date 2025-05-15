import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        // redirige peticiones a /api/* a tu Laravel
        '/api': {
          target: env.VITE_API_URL || 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
      },
    },
  });
};
