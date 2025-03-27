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
