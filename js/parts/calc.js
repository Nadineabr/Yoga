
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
