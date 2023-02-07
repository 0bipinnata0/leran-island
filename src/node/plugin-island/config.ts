import { Plugin } from 'vite';
import { SiteConfig } from 'shared/types/index';
import path from 'path';

const SITE_DATA_ID = 'island:site-data';

export function pluginConfig(
  config: SiteConfig,
  restartServer: () => Promise<void>
): Plugin {
  return {
    name: 'island:config',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];
      const include = (id: string) =>
        customWatchedFiles.some((file) => path.resolve(id).includes(file)); // windows用户需要使用path.resolve包裹一层

      if (include(ctx.file)) {
        console.log(
          `\n${path.relative(
            config.root,
            ctx.file
          )} changed, restarting server...`
        );
        // 重点: 重启 Dev Server
        await restartServer();
      }
    }
  };
}
