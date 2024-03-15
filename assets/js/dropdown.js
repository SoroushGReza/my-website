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

//     ----------------- Project Details Drop-Down

$(document).ready(function () {
  // Toggle button and dropdown content based on the button's data-target attribute
  $(".btn-details").click(function () {
    var $this = $(this);
    var targetSelector = $this.attr("data-target");
    var $dropdownContent = $(targetSelector);

    // Toggle visibility of the dropdown content and button
    $dropdownContent
      .collapse("toggle")
      .on("shown.bs.collapse", function () {
        $this.hide();
      })
      .on("hidden.bs.collapse", function () {
        $this.show();
      });
  });

  // Hide dropdown content when clicking outside of it
  $(document).click(function (event) {
    if (!$(event.target).closest(".btn-details, .collapse").length) {
      // Iterate through each dropdown to hide and show the respective button
      $(".collapse").each(function () {
        var $this = $(this);
        if ($this.hasClass("show")) {
          $this.collapse("hide");
          // Find the button that controls this dropdown and show it
          $('button[data-target="#' + $this.attr("id") + '"]').show();
        }
      });
    }
  });
});
