import { lazy } from 'react';

interface RouteInterface {
  path: string;
  // Component: React.LazyExoticComponent<() => JSX.Element>
  Component: any;
  exact: boolean;
}

export const routes: RouteInterface[] = [
  // Dashboards
  {
    path: '/popular-movies',
    Component: lazy(() => import('./app/App')),
    exact: true,
  },
  {
    path: '/favourite',
    Component: lazy(() => import('./pages/favourite')),
    exact: true,
  },
  {
    path: '/watch-later',
    Component: lazy(() => import('./pages/watch-later')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('./pages/404Error')),
    exact: true,
  },
];
