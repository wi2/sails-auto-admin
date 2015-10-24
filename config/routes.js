module.exports.routes = {

  '/admin': {
    controller: 'AdminController',
    action: 'home',
    locals: {layout: 'admin'}
  },
  '/admin/:identity': {
    controller: 'AdminController',
    action: 'list',
    locals: {layout: 'admin'}
  },
  '/admin/:identity/new': {
    controller: 'AdminController',
    action: 'new',
    locals: {layout: 'admin'}
  },
  '/admin/:identity/:id': {
    controller: 'AdminController',
    action: 'update',
    locals: {layout: 'admin'}
  }

};
