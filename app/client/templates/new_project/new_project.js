/*****************************************************************************/
/* NewProject: Event Handlers */
/*****************************************************************************/
Template.NewProject.events({
  'submit #new-form': function(e) {
    e.preventDefault();

    var newProject = {
      title: e.target['0'].value,
      urlTitle: e.target['0'].value.toLowerCase().replace(/ /g, '_'),
      userId: Meteor.userId()
    }

    Meteor.call('newProject', newProject, function(err, result) {
      if(err) {
        throwError(err.reason);
      }

      Router.go('/editor/' + newProject.urlTitle + '/' + result);
    });
  }
});

/*****************************************************************************/
/* NewProject: Helpers */
/*****************************************************************************/
Template.NewProject.helpers({
});

/*****************************************************************************/
/* NewProject: Lifecycle Hooks */
/*****************************************************************************/
Template.NewProject.onCreated(function () {
});

Template.NewProject.onRendered(function () {
});

Template.NewProject.onDestroyed(function () {
});
