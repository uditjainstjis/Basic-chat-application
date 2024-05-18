const io = require('socket.io')(3000,{
 cors: {
    origin: "*",
    methods: ["GET","POST"]
 }
}); 
  

const users = {}

io.on('connection', socket => {
    socket.on('new user', naam=>{
        users[socket.id] = naam
        socket.broadcast.emit('user-connected',naam)
        console.log("aagya banda")
    }
    )
    
    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message',{message:message, naam:users[socket.id]})
    })

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    }
    )
});

