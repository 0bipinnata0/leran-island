import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['./src/node/cli.ts', './src/node/index.ts'],
  clean: true, // 清空之前的构建产物
  bundle: true,
  splitting: true,
  outDir: 'dist',
  shims: true, // tsup 开启了 shims 选项之后，会自动帮我们注入一些 API 的 polyfill 代码，如 __dirname, __filename, import.meta 等等，保证这些 API 在 ESM 和 CJS 环境下的兼容性。
  format: ['cjs', 'esm'],
  dts: true
});
