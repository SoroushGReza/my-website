//     --------  Code Institute Diploma dropdowm Image

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("diploma-icon").onclick = function (event) {
    var dropdown = document.getElementById("diploma-dropdown");
    if (dropdown.style.display === "none") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
    event.stopPropagation();
  };

  window.onclick = function (event) {
    if (!event.target.matches("#diploma-icon")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
    }
  };
});

// ----------------- Project Details Drop-Down

$(document).ready(function () {
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  $('.project-div').each(function () {
      var $projectDiv = $(this);
      var $collapseDiv = $projectDiv.find('.collapse');

      var isClicked = false;

      if (isTouchDevice) {
          // On touch devices, open details on tap
          $projectDiv.on('click', function (e) {
              // Prevent clicks on carousel controls from toggling details
              if ($(e.target).closest('.carousel-control-prev, .carousel-control-next').length === 0) {
                  e.stopPropagation();
                  $collapseDiv.collapse('toggle');
              }
          });
      } else {
          // On desktop devices, open details on hover and click
          $projectDiv.on('mouseenter', function () {
              if (!isClicked) {
                  $collapseDiv.collapse('show');
              }
          }).on('mouseleave', function () {
              if (!isClicked) {
                  $collapseDiv.collapse('hide');
              }
          });

          $projectDiv.on('click', function (e) {
              // Prevent clicks on carousel controls from toggling details
              if ($(e.target).closest('.carousel-control-prev, .carousel-control-next').length === 0) {
                  e.stopPropagation();
                  isClicked = !isClicked;
                  $collapseDiv.collapse('show');
              }
          });

          // Close the collapse when clicking outside
          $(document).on('click', function (e) {
              if (isClicked && !$(e.target).closest($projectDiv).length) {
                  isClicked = false;
                  $collapseDiv.collapse('hide');
              }
          });
      }
  });
});
