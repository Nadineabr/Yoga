
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
      //AJAX
      var _catchData = function _catchData() {
        return new Promise(function (resolve, reject) {
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
                resolve(this.response);

                //Добавляем контент на страницу
              } else {
                reject();
              }
            }
          };

          for (var i = 0; i < input.length; i++) {
            input[i].value = ""; //Очищаем поля ввода
          }
        });
      };

      event.preventDefault();
      target.appendChild(statusConnect);
    };
    catchData().then(function (response) {
      var data = response;
      statusConnect.innerHTML = connect.success;
    }).catch(function () {
      return statusConnect.innerHTML = connect.failure;
    });
  });
}

module.exports = ajax;
