import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    watch: true, // opcional: pra rodar automático em alterações
    coverage: {
      reporter: ['text', 'html'], // se quiser relatório de cobertura
    },
  },
})
