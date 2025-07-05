import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  return {
    // React Router Vite 플러그인 제외 - Storybook 전용 설정
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '~': new URL('./app', import.meta.url).pathname,
      },
    },
  }
})