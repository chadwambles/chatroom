const socket = io("http://localhost:3000");
const msg_wrapper = document.getElementById("msg-wrapper");
const msg_form = document.getElementById("send-form-wrapper");
const msg_field = document.getElementById("msg-field");

const name = prompt("What is your name?");
addMsg("You joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  addMsg(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  addMsg(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  addMsg(`${name} disconnected`);
});

msg_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msg_field.value;
  addMsg(`You: ${message}`);
  socket.emit("send-chat-message", message);
  msg_field.value = "";
});

function addMsg(message) {
  const msg_element = document.createElement("div");
  msg_element.innerText = message;
  msg_wrapper.append(msg_element);
}
