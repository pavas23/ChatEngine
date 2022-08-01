
const socket = io("http://localhost:8000");

const form = document.getElementById("sendform");
const messageInp = document.getElementById("inputfield");
const messageContainer = document.getElementById("chatbox");
const usernamediv = document.querySelector("#username span");
const userContainer = document.getElementById('left');


const name_user = prompt("Enter your name to join the chat");

usernamediv.innerText = name_user;

socket.emit("new-user-joined", name_user);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = messageInp.value;
    if(message == ""){}
    else{
    append(message, "right");
    socket.emit("send", message);
    messageInp.value = "";}
})

var audio = new Audio("Whatsapp-incoming-message.mp3");
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == "left") {
        audio.play();
    }
}
const append2 = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add('italic');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == "left") {
        audio.play();
    }
}

socket.on("user-joined", (data) => {
    append2(`${data} joined the chat`, "left");
});

socket.on("receive", (data) => {
    append(`${(data.name)}:
     ${data.message_ans}`, "left");
});

socket.on("left", (name) => {
    append2(`${name} left the chat`, "left");

});

