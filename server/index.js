const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
    console.log("We have a connection!");
    socket.on('disconnect', () => {
        console.log("User left :(");
    });
});


server.listen(PORT, () => console.log(`Server has started on Port ${PORT}`));