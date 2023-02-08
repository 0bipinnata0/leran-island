import { RouteService } from './RouteService';
import { describe, expect, test } from 'vitest';
import path from 'path';

describe('RouteService', async () => {
  const testDir = path.join(__dirname, 'fixtures');
  const routeService = new RouteService(testDir);
  await routeService.init();

  test('conventional route by file structure', async () => {
    const routeMeta = routeService.getRouteMeta().map((item) => ({
      ...item,
      absolutePath: item.absolutePath.replace(testDir, 'TEST_DIR')
    }));
    expect(routeMeta).toMatchInlineSnapshot(`
      [
        {
          "absolutePath": "D:/develop/Island/src/node/plugin-routes/fixtures/a.mdx",
          "routePath": "/a",
        },
        {
          "absolutePath": "D:/develop/Island/src/node/plugin-routes/fixtures/guide/b.mdx",
          "routePath": "/guide/b",
        },
      ]
    `);
  });

  test('generate routes code', async () => {
    expect(routeService.generateRoutesCode().replaceAll(testDir, 'TEST_DIR'))
      .toMatchInlineSnapshot(`
"
import React from 'react';
import loadable from '@loadable/component';
const Route0 = loadable(() => import('D:/develop/Island/src/node/plugin-routes/fixtures/a.mdx'));
const Route1 = loadable(() => import('D:/develop/Island/src/node/plugin-routes/fixtures/guide/b.mdx'));
export const routes = [
{ path: '/a', element: React.createElement(Route0) },
{ path: '/guide/b', element: React.createElement(Route1) }
];
"
`);
  });
});
