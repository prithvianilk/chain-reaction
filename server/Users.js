let Users = [];
let Rooms = new Array(25);

Rooms.fill({members: []});

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
    console.log(Users);
    Rooms[roomNumber].members = [...Rooms[roomNumber].members, user];
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

module.exports = { addUser, removeUser, getUser, getNumberOfUsers };