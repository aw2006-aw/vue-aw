import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // ⚠️ GitHub Pages 部署：base 必须是 '/仓库名/' 格式
  // 部署后访问地址：https://aw2006-aw.github.io/vue-aw/
  // 本地开发不受影响（Vite dev server 忽略 base）
  base: '/vue-aw/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
