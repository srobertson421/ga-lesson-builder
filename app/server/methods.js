/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'newProject': function (project) {
    return Projects.insert(project);
  },

  'deleteProject': function(projectId) {
    //console.log('Trying to delete ' + projectId);
    Projects.remove(projectId);
  },

  'updateProject': function(projectData) {
    Projects.update(projectData.id, {$set: {data: projectData.data}});
  }
});
