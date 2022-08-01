const { Socket } = require("socket.io");
// imp to allow CORS request so that this server can be accessed by origin server
const io = require("socket.io")(8000, {
    cors: {
      origin: "https://pavas23.github.io/ChatEngine/",
      methods: ["GET", "POST"]
    }
  });

const users = {};
// many sockets are connected and io.on listens to all sockets
io.on('connection',(socket)=>{
    //socket.on for a particular socket what action to take
    // 1st event when user joins
    socket.on("new-user-joined",(username) =>{
        console.log(username);
        users[socket.id] = username;
        socket.broadcast.emit("user-joined",username); // will send this event to other users
    });
    socket.on("send",(message)=>{
        socket.broadcast.emit("receive",{message_ans:message,name:users[socket.id]})
    });
    socket.on("disconnect",()=>{
        socket.broadcast.emit("left",users[socket.id]);
        delete users[socket.id];
    })
});


