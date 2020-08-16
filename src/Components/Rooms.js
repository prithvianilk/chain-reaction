import React, { useEffect, useState } from 'react';
import { Stack, Badge, List, ListItem, Heading, Divider } from '@chakra-ui/core';
import queryString from 'query-string';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

let socket;
const Rooms = ({ location }) => {

    const ENDPOINT = 'localhost:5000';
    const [srn, setSRN] = useState('');
    const [gender, setGender] = useState('');
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const { gender, srn } = queryString.parse(location.search);
        setSRN(srn);
        setGender(gender);
        socket = io(ENDPOINT);

        socket.emit('getRooms', (rooms) => {
            setRooms(rooms);
        });

        return () => {
            socket.off();
        }

    }, [location.search, ENDPOINT]);

    const renderRoom = (room, dex) => {
        const { members } = room;
        var noClick = false;
        if (members.length == 2) noClick = true;
        if (members.length == 1) {
            if (members[0].gender === gender) noClick = true;
        }
        return (
            <Link key={dex} to={`/chat?room=${dex}&srn=${srn}&gender=${gender}`} style={{ pointerEvents: noClick ? "none" : "auto" }}>
                <ListItem backgroundColor="#EDF2F7" margin="5px" padding="10px 15px">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            Room {dex}
                        </div>
                        <div marginLeft="90%">
                            <Stack isInline>
                                {members.map(({gender}) => (
                                    <Badge fontSize = "12.5px" variantColor = {gender === "male" ? 'blue' : 'pink'}>{gender === "male" ? "boy":"girl"}</Badge>
                                ))}
                                {members.length === 0 ? (<Badge fontSize = "12.5px">empty</Badge>):""}
                            </Stack>
                        </div>
                    </div>
                </ListItem>
            </Link>
        )
    }

    return (
        <div className="form">
            <Heading>Rooms</Heading>
            <Divider />
            <List>
                {rooms.map(((room, dex) => renderRoom(room, dex)))}
            </List>
        </div>
    )
}

export default Rooms;