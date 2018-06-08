import Login from 'views/login';
import WorkInProgress from 'views/workInProgress';
import Unauthorized from 'views/unauthorized';

const authorizedRoutes = [{
  path: '/dashboard/analysis/realtime',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: WorkInProgress,
}, {
  path: '/dashboard/analysis/offline',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: WorkInProgress,
}, {
  path: '/dashboard/workplace',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: WorkInProgress,
}, {
  path: '/exception/403',
  exact: true,
  permissions: ['god'],
  component: WorkInProgress,
  unauthorized: Unauthorized,
}];

const normalRoutes = [{
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
  normalRoutes,
};
