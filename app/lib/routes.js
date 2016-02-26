var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {
        throwError('Please login!');
        Router.go('home');
      } else {
        this.next();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['profile']
});

Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/profile', {
  name: 'profile',
  controller: 'ProfileController',
  where: 'client'
});

Router.route('/editor/:title/:id', {
  name: 'editor',
  controller: 'EditorController',
  where: 'client'
});

Router.route('/new_project', {
  name: 'newProject',
  controller: 'NewProjectController',
  where: 'client'
});