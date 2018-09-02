

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