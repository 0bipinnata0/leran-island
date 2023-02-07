import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { pluginConfig } from './plugin-island/config';

export async function createDevServer(
  root: string,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
  console.log('读取配置', config);
  return createViteDevServer({
    root,
    plugins: [
      pluginIndexHtml(),
      pluginReact(),
      pluginConfig(config, restartServer)
    ],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
