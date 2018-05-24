import Login from 'views/login';
import Home from 'views/home';
import Analysis from 'views/analysis';

const authorizedRoutes = [{
  path: '/dashboard/analysis/realtime',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: Analysis,
}, {
  path: '/dashboard/analysis/offline',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: Analysis,
}, {
  path: '/dashboard/monitor',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: Analysis,
}, {
  path: '/dashboard/workplace',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: Analysis,
}, {
  path: '/marketing',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: Home,
}, {
  path: '/settings/users',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: Home,
}];

const unAuthorizedRoutes = [{
  path: '/',
  exact: true,
  redirect: '/dashboard/analysis/realtime',
}, {
  path: '/login',
  exact: true,
  component: Login,
}];

export {
  authorizedRoutes,
  unAuthorizedRoutes,
};
