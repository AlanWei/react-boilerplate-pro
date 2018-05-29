import Login from 'views/login';
import workInProgress from 'views/workInProgress';

const authorizedRoutes = [{
  path: '/dashboard/analysis/realtime',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: workInProgress,
}, {
  path: '/dashboard/analysis/offline',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: workInProgress,
}, {
  path: '/dashboard/monitor',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: workInProgress,
}, {
  path: '/dashboard/workplace',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: workInProgress,
}, {
  path: '/marketing',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: workInProgress,
}, {
  path: '/settings/users',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: workInProgress,
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
