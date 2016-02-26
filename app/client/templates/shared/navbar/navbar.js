Template.navbar.onRendered(function() {
  $('.nav a').on('click', function(){
    $('.btn-navbar').click(); //bootstrap 2.x
    $('.navbar-toggle').click() //bootstrap 3.x by Richard
  });

  $('.navbar-brand').on('click', function() {
    if(!$('.navbar-toggle').hasClass('collapsed')) {
      $('.navbar-toggle').click() //bootstrap 3.x by Richard
    }
  });
});