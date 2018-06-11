import Login from 'views/login';
import Outlets from 'views/outlets';
import OutletDetail from 'views/outletDetail';
import WorkInProgress from 'views/workInProgress';
import Unauthorized from 'views/unauthorized';

const authorizedRoutes = [{
  path: '/dashboard/analysis/realtime',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: WorkInProgress,
  pageTitle: '',
}, {
  path: '/dashboard/analysis/offline',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: WorkInProgress,
  pageTitle: '',
}, {
  path: '/dashboard/workplace',
  exact: true,
  permissions: ['admin'],
  redirect: '/login',
  component: WorkInProgress,
  pageTitle: '',
}, {
  path: '/outlets',
  exact: true,
  permissions: ['admin', 'user'],
  component: Outlets,
  unauthorized: Unauthorized,
  pageTitle: 'pageTitle_outlets',
  breadcrumb: ['/outlets'],
}, {
  path: '/outlets/:id',
  exact: true,
  permissions: ['admin', 'user'],
  component: OutletDetail,
  unauthorized: Unauthorized,
  pageTitle: 'pageTitle_outletDetail',
  breadcrumb: ['/outlets', '/outlets/:id'],
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
  redirect: '/outlets',
}, {
  path: '/login',
  exact: true,
  component: Login,
}];

const combineRoutes = [
  ...authorizedRoutes,
  ...normalRoutes,
];

export {
  authorizedRoutes,
  normalRoutes,
  combineRoutes,
};
