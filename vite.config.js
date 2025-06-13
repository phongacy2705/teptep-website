import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Đảm bảo server dev chạy đúng cổng nếu cần
  server: {
    port: 5173, 
  },
  // Cấu hình cho quá trình build
  build: {
    outDir: 'dist' // Thư mục đầu ra sau khi build
  }
})
