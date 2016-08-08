Router.configure({
  layoutTemplate: 'form_layout'
});

Router.map(function() {
  this.route('login', {
    path: '/',
    template: 'login'
  });
});

Router.map(function() {
  this.route('register', {
    path: '/register',
    template: 'register'
  });
});

Router.map(function() {
  this.route('dashboard', {
    layoutTemplate: 'dashboard_layout',
    path: '/dashboard',
    template: 'dashboard',
    // Prevents access to dashboard page if not logged in
    onBeforeAction: function () {
      if (Meteor.user() == null) {
        Router.go('/');
      }
      this.next();
    }
  });
});
