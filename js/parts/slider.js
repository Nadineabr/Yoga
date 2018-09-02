
  function slider() {
    //Slider
    //первый слайд
    var slideIndex = 1,
        slides = document.getElementsByClassName('slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.getElementsByClassName('dot');

    showSlides = function showSlides(n) {
      if (n > slides.length) {
        slideIndex = 1;
      }

      ;

      if (n < 1) {
        slideIndex = slides.length;
      }

      ;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }

      ;

      for (var _i = 0; _i < dots.length; _i++) {
        dots[_i].classList.remove('dot-active');
      }

      ;
      slides[slideIndex - 1].style.display = 'block';
      dots[slideIndex - 1].classList.add('dot-active');
    };

    showSlides(slideIndex);

    plusSlides = function plusSlides(n) {
      showSlides(slideIndex += n);
    };

    currentSlide = function currentSlide(n) {
      showSlides(slideIndex = n);
    };

    prev.addEventListener('click', function () {
      plusSlides(-1);
    });
    next.addEventListener('click', function () {
      plusSlides(1);
    });
    dotsWrap.addEventListener('click', function (event) {
      for (var i = 0; i < dots.length + 1; i++) {
        if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
          currentSlide(i);
        }
      }
    });
  }

  module.exports = slider;
