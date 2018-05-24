const menuData = [{
  name: 'Dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: 'Analysis',
    path: 'analysis',
    children: [{
      name: 'Real-time',
      path: 'realtime',
    }, {
      name: 'Offline',
      path: 'offline',
    }],
  },
  {
    name: 'Monitor',
    path: 'monitor',
  },
  {
    name: 'Workplace',
    path: 'workplace',
  }],
}, {
  name: 'Marketing',
  icon: 'table',
  path: 'marketing',
}, {
  name: 'Settings',
  icon: 'setting',
  path: 'settings',
  children: [{
    name: 'Users Management',
    path: 'users',
  }],
}];

export default menuData;
