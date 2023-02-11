'use strict';

let messagesBlock;
let socket;

document.body.onload = loadDocument();

function loadDocument() {
  messagesBlock = document.getElementById('messagesBlock');
  socket = io('http://localhost:3000');
  socket.on('connect', function () {
    console.log('Connected');

    socket.emit('events', { test: 'test' });
    socket.emit('identity', 0, (response) =>
      console.log('Identity:', response),
    );
  });
  socket.on('events', function (data) {
    console.log('event', data);
  });
  socket.on('message', function (data) {
    if (data) {
      writeMessage({ direction: 'left', message: data });
    }
  });
  socket.on('exception', function (data) {
    console.log('event', data);
  });
  socket.on('disconnect', function () {
    console.log('Disconnected');
  });
}

function writeMessage({ direction = 'left', message = '' }) {
  const messageParagraph = document.createElement('p');
  messageParagraph.setAttribute(
    'class',
    `p-2 ${direction === 'left' ? 'has-text-left' : 'has-text-right'}`,
  );
  messageParagraph.setAttribute('style', 'overflowWrap: normal;');

  const messageItem = document.createElement('span');
  messageItem.setAttribute(
    'class',
    `tag is-medium ${direction === 'left' ? 'is-success' : 'is-info'}`,
  );
  messageItem.innerText = message;

  messageParagraph.appendChild(messageItem);

  messagesBlock.appendChild(messageParagraph);

  const br = document.createElement('br');
  messagesBlock.appendChild(br);
}

function sendMessage() {
  const msg = document.getElementById('message').value.trim();
  if (msg && socket) {
    writeMessage({ direction: 'right', message: msg });
    socket.emit('message', { value: msg });
  } else {
    alert('Stop send empty messages');
  }
}
