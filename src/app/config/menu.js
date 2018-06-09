const menuData = [{
  name: 'siderMenu_dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: 'siderMenu_analysis',
    path: 'analysis',
    children: [{
      name: 'siderMenu_realtime',
      path: 'realtime',
    }, {
      name: 'siderMenu_offline',
      path: 'offline',
    }],
  },
  {
    name: 'siderMenu_workplace',
    path: 'workplace',
  }],
}, {
  name: 'siderMenu_outlets',
  icon: 'shop',
  path: 'outlets',
}, {
  name: 'siderMenu_exception',
  icon: 'table',
  path: 'exception',
  children: [{
    name: 'siderMenu_403',
    path: '403',
  }, {
    name: 'siderMenu_404',
    path: '404',
  }],
}];

export default menuData;
