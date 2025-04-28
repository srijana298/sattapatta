import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true
      },
      include: '**/*.svg'
    })
  ],
  server: {
    host: '127.0.0.1'
  }
});
