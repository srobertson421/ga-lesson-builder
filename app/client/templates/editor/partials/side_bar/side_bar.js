Template.sideBar.onRendered(function() {
  // target elements with the "draggable" class
  interact('.draggable')
  .preventDefault('never')
  .on('move', function (event) {
    if (event.interaction.interacting()) {
      // prevent default only while interacting
      event.preventDefault();
    }
  })
  .on('tap', function(event) {
    $('.creatable').css('z-index', 0);
    event.currentTarget.style.zIndex = 99;
  })
  .draggable({
    snap: {
      targets: [
        interact.createSnapGrid({ x: 5, y: 5 })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    },
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: ".container-fluid",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      // var textEl = event.target.querySelector('p');

      // textEl && (textEl.textContent =
      //   'moved a distance of '
      //   + (Math.sqrt(event.dx * event.dx +
      //                event.dy * event.dy)|0) + 'px');
    }
  })
  .resizable({
    preserveAspectRatio: true,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });

  interact('.delete-zone').dropzone({
    accept: '.draggable',
    overlap: 'pointer',
    ondragenter: function(event) {
      event.target.style.backgroundColor = 'red';
    },
    ondragleave: function(event) {
      event.target.style.backgroundColor = '';
    },
    ondrop: function(event) {
      //$(event.relatedTarget).remove();
      swal({
        title: "Are you sure?",
        text: "Delete element?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
      }, function(){
        $(event.relatedTarget).remove();
        event.target.style.backgroundColor = '';
      });
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
});

Template.sideBar.events({
  'click .create-elem': function(e) {
    e.preventDefault();
    var type = $(e.currentTarget).attr('elem-type');

    createElement(type);
  }
});

function createElement(elemType) {
  $('#main-area').append('<div contentEditable="true" class="' + elemType + ' draggable creatable"><h3 contentEditable="true">' + elemType + '</h3></div>');
}
