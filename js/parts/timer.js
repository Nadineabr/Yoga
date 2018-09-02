
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
