// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      'redux-persist': 'redux-persist/es',
    },
  },
   server: {
    historyApiFallback: true,
 allowedHosts: ["xelitesilks.com", "www.xelitesilks.com"],
  },
   ssr: {
    noExternal: ['react-helmet-async', 'react-dom/server','react-redux', 'redux-persist', '@reduxjs/toolkit','react-quill','jodit-react']
  },
  optimizeDeps: {
    include: ['react-helmet-async', 'react-dom/server','react-slick']
  },
  
  
})