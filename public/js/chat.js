window.onload = function () {
  var socket = new WebSocket("ws://localhost:3000/chat");
  var id = Math.random();

  socket.onopen = function () {
    console.debug('Соединение установлено.');
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.debug('Соединение закрыто чисто');
    } else {
      console.debug('Обрыв соединения');
    }
    console.debug('Код: ' + event.code + ' причина: ' + event.reason);
  };

  socket.onerror = function (error) {
    console.error("Ошибка " + error.message);
  };

  var btn = document.getElementById('send');
  var message = document.getElementById('message');
  var messages = document.getElementById('messages');

  btn.onclick = function () {
    let text = message.value;
    message.value = "";
    socket.send(JSON.stringify({
      "id": id,
      "type": "message",
      "value": text
    }));
  };


  socket.onmessage = function (event) {
    console.log("Получены данные " + event.data);
    try {
      var data = JSON.parse(event.data);
      if (data.type === 'message') {
        if (id === data.id) {
          messages.innerHTML += '<p class="out"><strong>Вы: </strong>' + data.value + '</p>';
        } else {
          messages.innerHTML += '<p class="in"><strong>Кто-то: </strong>' + data.value + '</p>';
        }
      }
    } catch( e) {
      console.log(e);
    }
  };


};