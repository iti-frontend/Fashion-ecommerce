// slider

var slides = document.querySelectorAll(".heroImg");
var current = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function next() {
  current++;
  if (current >= slides.length) {
    current = 0;
  }
  showSlide(current);
}

function prev() {
  current--;
  if (current < 0) {
    current = slides.length - 1;
  }
  showSlide(current);
}

setInterval(next, 5000);

// slider

// shop now button

document.querySelector(".herobtn").addEventListener("click", function () {
  open("sub-pages/shop.html", "_self");
});

// shop now button


