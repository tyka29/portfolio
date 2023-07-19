const carouselItems = document.querySelectorAll('.carousel-item');

let currentSlide = 0;

function showSlide() {
  carouselItems.forEach((item, index) => {
    if (index === currentSlide) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % carouselItems.length;
  showSlide();
}

setInterval(nextSlide, 3000);
