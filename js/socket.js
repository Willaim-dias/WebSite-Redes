//Create a new WebSocket connection to the server at address 'ws://localhost:8080'
const socket = new WebSocket('ws://localhost:8080');

//Defines a function to be performed when the connection to the server is opened
socket.onopen = () => {
    alert('Conectado ao servidor');
};

//Defines a function to be performed when a message is received from the server
socket.onmessage = (event) => {
    const chat = document.getElementById('chat');
    //Adds the received message to the content of the 'chat' element as a new paragraph
    chat.innerHTML += `<p id="resp">Resp: ${event.data}</p>`;
};

//Function to send a message to the server via WebSocket
function sendMessage() {
    const message = document.getElementById('message').value;
    const chat = document.getElementById('chat');
    //Adds the sent message to the content of the 'chat' element as a new paragraph
    chat.innerHTML += `<p>Você: ${message}</p>`;
    //Sends the message to the server via WebSocket
    socket.send(message);
}
