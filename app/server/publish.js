Meteor.publish('projects', function() {
  return Projects.find({userId: this.userId});
});
