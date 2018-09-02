(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//ждем загрузки DOM 
"use strict"
window.addEventListener('DOMContentLoaded', function()  {

	var tab = require('../parts/tab.js');
	var modal = require('../parts/modal.js');
	var ajax = require('../parts/ajax.js');
	var slider = require('../parts/slider.js');
	var calc = require('../parts/calc.js');
	var timer = require('../parts/timer.js');

	tab();
	modal();
	ajax();
	slider();
	calc();
	timer();

});




},{"../parts/ajax.js":2,"../parts/calc.js":3,"../parts/modal.js":4,"../parts/slider.js":5,"../parts/tab.js":6,"../parts/timer.js":7}],2:[function(require,module,exports){

  function ajax() {
    //Form
    var connect = new Object();
    connect.loading = "Загрузка...";
    connect.success = "Спасибо! Скоро мы с вами свяжемся";
    connect.failure = "Что-то пошло не так...";
    var input = document.querySelectorAll('.input-form');
    var statusConnect = document.createElement('div');
    statusConnect.classList.add('status');
    var body = document.getElementsByTagName('body')[0]; //delegate

    body.addEventListener('submit', function (event) {
      var target = event.target;

      if (target && target.nodeName == 'FORM') {
        event.preventDefault();
        target.appendChild(statusConnect); //AJAX
function catchData(){
  return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var formData = new FormData(body);
        request.send(formData);

        request.onreadystatechange = function () {
          if (request.readyState < 4) {
            statusConnect.innerHTML = connect.loading;
          } else if (request.readyState === 4) {
            if (request.status == 200 && request.status < 300) {
              resolve(this.response)
               
              //Добавляем контент на страницу
            } else {
              reject();
            }
          }
        };

        for (var i = 0; i < input.length; i++) {
          input[i].value = ""; //Очищаем поля ввода
        }
  })
}

      };
     catchData()
     .then(response => {
      let data = response;
      statusConnect.innerHTML = connect.success;
     }) 
     .catch(() => statusConnect.innerHTML = connect.failure);
    });
  }

  module.exports = ajax;

},{}],3:[function(require,module,exports){

  function calc() {
    //Calc
    var persons = document.getElementsByClassName('counter-block-input')[0],
        restDays = document.getElementsByClassName('counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0,
        reg = /[\D,+.]/ig;
    totalValue.innerHTML = 0;
    persons.addEventListener('change', function () {
      personsSum = +this.value;
      total = (daysSum + personsSum) * 4000;

      if (persons.value.match(reg)) {
        persons.value = '';
        totalValue.innerHTML = 0;
      } else if (restDays.value == '') {
        totalValue.innerHTML = 0;
      } else {
        totalValue.innerHTML = total;
      }
    });
    restDays.addEventListener('change', function () {
      daysSum = +this.value;
      total = (daysSum + personsSum) * 4000;

      if (restDays.value.match(reg)) {
        restDays.value = '';
        totalValue.innerHTML = 0;
      } else if (persons.value == '') {
        totalValue.innerHTML = 0;
      } else {
        totalValue.innerHTML = total;
      }
    });
    place.addEventListener('change', function () {
      if (restDays.value == '' || persons.value == '') {
        totalValue.innerHTML = 0;
      } else {
        var a = total;
        totalValue.innerHTML = a * this.options[this.selectedIndex].value;
      }
    });
    persons.addEventListener('change', function () {
      if (persons.value == '' || persons.value == '0' || restDays.value == '' || restDays.value == '0') {
        totalValue.innerHTML = 0;
      }
    });
    restDays.addEventListener('change', function () {
      if (restDays.value == '' || restDays.value == '0' || persons.value == '' || persons.value == '0') {
        totalValue.innerHTML = 0;
      }
    });
  }

  module.exports = calc;

},{}],4:[function(require,module,exports){

  function modal() {
    //Модальное окно
    var more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    more.addEventListener('click', function () {
      this.classList.add('more-splash');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function () {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
    });
    var btns = document.getElementsByClassName('description-btn');

    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        this.classList.add('more-splash');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
      close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
      });
    }

    ;
  }

  module.exports = modal;

},{}],5:[function(require,module,exports){

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

},{}],6:[function(require,module,exports){


 function tab() {
    var tab = document.getElementsByClassName('info-header-tab');
    var tabContent = document.getElementsByClassName('info-tabcontent');
    var info = document.getElementsByClassName('info-header')[0]; //скрываем табы, показываем только первый

    hideTabContent = function hideTabContent(a) {
      for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
      }
    }; // первый таб показывается 1 вместо i


    hideTabContent(1); //функция показа табов

    showTabContent = function showTabContent(b) {
      if (tabContent[b].classList.contains('hide')) {
        hideTabContent(0);
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
      }
    };

    info.addEventListener('click', function (e) {
      var target = e.target; //делегирование: проверка на наличие класса

      if (target.className == 'info-header-tab') {
        //перебираем все табы
        for (var i = 0; i < tab.length; i++) {
          //проверяем, на какой именно таб клик
          if (target == tab[i]) {
            showTabContent(i);
            break;
          }
        }
      }
    });
  }

  module.exports = tab;
},{}],7:[function(require,module,exports){

  function timer() {
    //timer
    //дата, на которой заканчивается таймер
    var deadLine = '2018-09-20';

    getTimeRemaining = function getTimeRemaining(endtime) {
      //содержит разницу между дедлайном и текущей датой, в мс
      var t = Date.parse(endtime) - Date.parse(new Date()),
          //получение часов, минут, секунд
      seconds = Math.floor(t / 1000 % 60),
          minutes = Math.floor(t / 1000 / 60 % 60),
          hours = Math.floor(t / (1000 * 60 * 60));
      if (hours <= 9) hours = "0".concat(hours);
      if (minutes <= 9) minutes = "0".concat(minutes);
      if (seconds <= 9) seconds = "0".concat(seconds);
      return {
        //сколько мс осталось
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }; //запуск часов


    setClock = function setClock(id, endtime) {
      var timer = document.getElementById(id),
          hours = timer.querySelector('.hours'),
          minutes = timer.querySelector('.minutes'),
          seconds = timer.querySelector('.seconds'); //функция, которая будет обновлять таймер каждую секунду

      updateClock = function updateClock() {
        var t = getTimeRemaining(endtime);
        hours.innerHTML = t.hours;
        minutes.innerHTML = t.minutes;
        seconds.innerHTML = t.seconds; //когда таймер остановится

        if (t.total <= 0) {
          clearInterval(timeInterval);
          seconds.innerHTML = '00', minutes.innerHTML = '00', hours.innerHTML = '00';
        }

        ;
      };

      var timeInterval = setInterval(updateClock, 1000);
      updateClock();
    };

    setClock('timer', deadLine);
  }

  module.exports = timer;

},{}]},{},[1]);
