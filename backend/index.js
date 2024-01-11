require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { config } = require('dotenv');
const {Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`Usuario ${socket.id} se unió a la sala: ${data}`);
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on('disconnect', (data) => {
        console.log(`Usuario ${socket.id} desconectado`);
    })
});

server.listen(3000, () => {
    console.log(`SERVER RUNNING PORT: 3000`);
});