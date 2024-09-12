import { defineConfig } from 'vite'
import path from 'path';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      copyDtsFiles: true,
      tsconfigPath: './tsconfig.build.json', 
      // rollupTypes: true, 
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'components-library',
      formats: ["es"],
      fileName: 'my-lib'
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
})
