$(document).ready(function() {
  //Show/hide the search menu on button click
    var toggle = true;
    function show() {
      function bigViewport() {
        if(window.matchMedia("(min-width: 601px)").matches) {
          $('#side-view').show(1000);
          $('#search-area').show(1000);
          toggle = true;
        }
      }
      function smallViewport() {
        if(window.matchMedia("(min-width: 100px) and (max-width: 600px)").matches) {
          $('#side-view').show(1000);
          toggle = true;
        }
      }
        bigViewport();
        smallViewport();
    }
    function hide() {
        $('#side-view').hide(1000);
        toggle = false;
        console.log(toggle);
        }

    function toggleSideView(){
      if(toggle === true) {
        hide();
      } else {
        show();
      }
    }
    $('#side-view-btn').click(toggleSideView);
});
