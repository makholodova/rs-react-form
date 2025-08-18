import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setupTests.ts',
    clearMocks: true,
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/main.{ts,tsx}',
        'src/setupTests.{ts}',
        'src/**/*.d.ts',
      ],
      thresholds: {
        functions: 50,
        lines: 50,
        statements: 80,
        branches: 50,
      },
    },
  },
});
