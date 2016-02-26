Template.profile.helpers({
});

Template.profile.events({
  'click .btn-danger': function(e) {
    e.preventDefault();
    var that = this;
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this project!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function(){
      Meteor.call('deleteProject', that._id, function(err, result) {
        swal("Deleted!", "Your project has been deleted.", "success");
      }); 
    });
  }
});