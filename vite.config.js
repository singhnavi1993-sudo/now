import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import { exec } from 'node:child_process';

function sitemapPlugin() {
  return {
    name: 'auto-generate-sitemap',
    buildStart() {
      exec('npm run sitemap', (err, stdout, stderr) => {
        if (err) console.error('Sitemap generation failed:', stderr);
        else console.log(stdout.trim());
      });
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('gamesData.js') || file.endsWith('gameSeoContent.json') || file.endsWith('homeSchema.json')) {
        console.log(`Data change detected. Regenerating sitemaps...`);
        exec('npm run sitemap', (err, stdout, stderr) => {
          if (err) console.error('Sitemap regeneration failed:', stderr);
          else console.log(stdout.trim());
        });
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin(), sitemapPlugin()],
    server: {
        port: 58582,
    }
})