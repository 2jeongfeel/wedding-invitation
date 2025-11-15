import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 레포 이름에 맞게 base 수정
export default defineConfig({
  plugins: [vue()],
  base: '/wedding-invitation/',   // 🔴 레포 이름으로 변경
  build: {
    outDir: 'docs'                // GitHub Pages에서 사용할 폴더
  }
})
