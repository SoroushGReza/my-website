//    ------------------   Slides

$(document).ready(function () {
  $(".carousel").each(function () {
    var carouselId = "#" + $(this).attr("id");

    $(carouselId).carousel({
      pause: "hover",
      interval: false,
    });
  });
});
