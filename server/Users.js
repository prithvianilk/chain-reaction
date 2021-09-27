let Users = [];
let Rooms = [];
for (var i = 0; i < 25; i++) Rooms.push({ members: [] });

const addUser = ({ id, UID, gender, roomNumber }) => {
    if (Users.find((user) => user.UID == UID)) {
        return { error: 'UID is already online.' };
    }
    const currRoom = Rooms[roomNumber];
    if (currRoom.members.length > 1) return { error: 'Room is Filled.' };
    if (currRoom.members.length === 1) {
        if (currRoom.members[0].gender === gender) {
            return { error: 'Room Member is of the same gender as you.' };
        }
    }
    const user = { id, UID, gender, roomNumber };
    Users.push(user);
    currRoom.members.push(user);
    return { user };
};

const removeUser = (id, roomNumber) => {
    Users = Users.filter((user) => user.id != id);
    const currRoom = Rooms[roomNumber];
    currRoom.members = currRoom.members.filter((user) => user.id !== id);
};

const getUser = (id) => Users.find((user) => user.id == id);

const getNumberOfUsers = () => {
    const boys = Users.filter((user) => user.gender == 'male').length;
    const girls = Users.length - boys;
    return { boys, girls };
};

const getRooms = () => Rooms;

module.exports = { addUser, removeUser, getUser, getNumberOfUsers, getRooms };
