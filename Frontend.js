const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

appendMessage('You joined')

let naam;
while (!naam) {
  naam = prompt('What is your name?');
  if (naam === null) {
    // alert('Name is required to join the chat.');
    naam = prompt('What is your name?');

  } else {
    naam = naam.trim();
    if (naam.length === 0) {
      alert('Name cannot be empty.');
      naam = null;
    }
  }
}

socket.emit('new user',naam)

socket.on('chat-message', data =>{
    appendMessage(`${data.naam}: ${data.message}`)
})

socket.on('user-connected', naam =>{
    appendMessage(`${naam} connected`)
})

socket.on('user-disconnected', naam =>{
    appendMessage(`${naam} disconnected`)
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    if(message.length>0 && message.trim().length != 0){
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value = ''
    }
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}