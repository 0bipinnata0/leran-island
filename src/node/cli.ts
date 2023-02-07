import { cac } from 'cac';
import * as path from 'path';
import { createDevServer } from './dev';
import { build } from './build';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('../../package.json').version;

const cli = cac('island').version(version).help();

cli
  .command('dev [root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    const createServer = async () => {
      // root = root ? path.resolve(root) : process.cwd();
      // const { createDevServer } = await import('./dev.js');

      const server = await createDevServer(root, async () => {
        await server.close();
        await createServer();
      });
      await server.listen();
      server.printUrls();
    };
    await createServer();
  });

cli
  .command('build [root]', 'build in production')
  .action(async (root: string) => {
    try {
      root = path.resolve(root);
      await build(root);
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
