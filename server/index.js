const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');
const { addUser, removeUser, getUser, getRooms } = require('./Users');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
    console.log("We have a connection!");

    socket.on('getRooms', (callback) => {
        const rooms = getRooms();
        callback(rooms);
    })

    socket.on('join', ({ srn, gender, roomNumber }, callback) => {
        const { error, user } = addUser({ id: socket.id, srn, gender, roomNumber });
        if (error) return callback(error);
        socket.join(user.roomNumber);
        socket.emit('message', { srn: "admin", message: `Welcome to the room, ${srn}!`, type: "success" });
        socket.broadcast.to(user.roomNumber).emit('message', { srn: "admin", message: `User ${srn} has entered the room!`, type: "success" });
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.roomNumber).emit('message', { ...user, message });
        callback();
    });

    socket.on('removeUser', () => {
        const user = getUser(socket.id);
        if (user === undefined) return;
        const { srn, roomNumber } = user;
        socket.broadcast.to(roomNumber).emit('message', { srn: "admin", message: `User ${srn} has left the room.`, type: "error" });
        removeUser(socket.id, roomNumber);
        console.log(`User ${socket.id} left :(`);
    })

    socket.on('disconnect', () => {
    });
});


server.listen(PORT, () => console.log(`Server has started on Port ${PORT}`));