import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
   port: 5173,
   strictPort: true,

  },
  server: {
   port: 5173,
   strictPort: true,
    host:true,
   origin: "http://0.0.0.0:3000/FrontEnd_POS_Project",
  
  },
  base:"http://0.0.0.0/FrontEnd_POS_Project"

})
