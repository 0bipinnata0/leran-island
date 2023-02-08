import { useRoutes } from 'react-router-dom';
import { routes } from 'island:routes';

// 浏览器访问http://localhost:5173/guide/可以看到结果

export const Content = () => {
  const routeElement = useRoutes(routes);
  return routeElement;
};
