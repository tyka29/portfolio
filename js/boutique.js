$(document).ready(function() {
  $(".carousel").owlCarousel({
    items: 3,
    loop: true,
    margin: 20,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      }
    }
  });
});
