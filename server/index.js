const socketio = require('socket.io');
const http = require('http');
const {
    addUser,
    removeUser,
    getUser,
    getRooms,
    getNumberOfUsers,
} = require('./Users');

const PORT = process.env.PORT || 5000;
const server = http.createServer();
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a connection!');

    socket.on('getRooms', (callback) => {
        const rooms = getRooms();
        callback(rooms);
    });

    socket.on('join', ({ UID, gender, roomNumber }, callback) => {
        console.log(UID);
        const { error, user } = addUser({
            id: socket.id,
            UID,
            gender,
            roomNumber,
        });
        if (error) return callback(error);
        socket.join(user.roomNumber);
        socket.emit('message', {
            UID: 'admin',
            message: `Welcome to the room, ${UID}!`,
            type: 'success',
        });
        socket.broadcast.to(user.roomNumber).emit('message', {
            UID: 'admin',
            message: `User ${UID} has entered the room!`,
            type: 'success',
        });
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
        const { UID, roomNumber } = user;
        socket.broadcast.to(roomNumber).emit('message', {
            UID: 'admin',
            message: `User ${UID} has left the room.`,
            type: 'error',
        });
        removeUser(socket.id, roomNumber);
    });

    socket.on('getNumberOfUsers', (callback) => {
        const numberOfUsers = getNumberOfUsers();
        callback(numberOfUsers);
    });

    socket.on('disconnect', () => console.log('disconnected'));
});

server.listen(PORT, () => console.log(`Server has started on Port ${PORT}`));
