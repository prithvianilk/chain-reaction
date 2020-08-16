let Users = [];
let Rooms = [];
for(var i = 0; i < 25;i++) Rooms.push({members: []});

const addUser = ({ id, srn, gender, roomNumber}) => {
    if (Users.find((user) => user.srn == srn)) return { error: "SRN is already online." };
    const currRoom = Rooms[roomNumber];
    if (currRoom.members.length > 1) return { error: "Room is Filled." };
    if(currRoom.members.length === 1)
    {
        if(currRoom.members[0].gender === gender) return {error: "Room Member is of the same gender as you."};
    }
    const user = { id, srn, gender, roomNumber };
    Users.push(user);
    currRoom.members.push(user);
    return { user };
}

const removeUser = (id) => {
    Users = Users.filter((user) => user.id != id);
}

const getUser = (id) => Users.find((user) => user.id == id);

const getNumberOfUsers = () => {
    const males = Users.filter(user => user.gender == 'male').length;
    const females = Users.length - males;
    return males, females;
}

const getRooms = () => Rooms;

module.exports = { addUser, removeUser, getUser, getNumberOfUsers, getRooms };