/*****************************************************************************/
/* Editor: Event Handlers */
/*****************************************************************************/
Template.Editor.events({
  'click #save-button': function(e) {
    e.preventDefault();

    var domList = [];
    $('#main-area').children().each(function(index, elem) {
      domList.push(elem.outerHTML);
    });

    var dataObj = {
      id: this.id,
      data: domList
    }

    Meteor.call('updateProject', dataObj, function(err, result) {
      swal("Saved!", "Your project has been saved.", "success");
    });
  }
});

/*****************************************************************************/
/* Editor: Helpers */
/*****************************************************************************/
Template.Editor.helpers({});

/*****************************************************************************/
/* Editor: Lifecycle Hooks */
/*****************************************************************************/
Template.Editor.onCreated(function () {
});

Template.Editor.onRendered(function () {
  var elements = this.data.project.data;
  for(var i = 0; i < elements.length; i++) {
    $('#main-area').append(elements[i]);
  }
});

Template.Editor.onDestroyed(function () {
  if(!Meteor.user()) {
    Meteor.call('deleteProject', this.data.id);
  }
});
