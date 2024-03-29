import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Badge,
    Button,
    Divider,
    Heading,
    List,
    ListItem,
    Stack,
    StatGroup,
    Stat,
    StatNumber,
    StatLabel,
} from '@chakra-ui/core';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

let socket;
const Rooms = ({ location }) => {
    const ENDPOINT =
        process.env.NODE_ENV === 'production'
            ? 'https://chain-reaction-app.herokuapp.com/'
            : 'http://localhost:5000/';
    const [UID, setUID] = useState('');
    const [gender, setGender] = useState('');
    const [rooms, setRooms] = useState([]);
    const [userCount, setUserCount] = useState({ boys: 0, girls: 0 });
    const [isOpen, setIsOpen] = useState();
    const [error, setError] = useState({});
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    useEffect(() => {
        const { gender, UID } = queryString.parse(location.search);
        setUID(UID);
        setGender(gender);
        socket = io(ENDPOINT);

        socket.emit('getRooms', (rooms) => {
            setRooms(rooms);
        });

        return () => {
            socket.off();
        };
    }, [location.search, ENDPOINT]);

    useEffect(() => {
        socket.on('getNewRooms', (rooms) => {
            setRooms(rooms);
        });
    }, []);

    useEffect(() => {
        socket.emit('getNumberOfUsers', (numberOfUsers) => {
            setUserCount(numberOfUsers);
        });
    }, []);

    const handleEnter = (e, noClick, errorMessage) => {
        if (noClick) {
            e.preventDefault();
            setIsOpen(true);
            setError(errorMessage);
        }
    };

    const renderRoom = (room, dex) => {
        const { members } = room;
        var noClick = false;
        var errorMessage = {};
        if (members.length === 2) {
            noClick = true;
            errorMessage = {
                header: 'Room Full',
                body: 'There are already two people in this room. Please choose another room.',
            };
        }
        if (members.length === 1) {
            if (members[0].gender === gender) {
                noClick = true;
                errorMessage = {
                    header: 'Cannot join this room',
                    body: `There is already a ${
                        gender === 'female' ? 'girl' : 'boy'
                    } in this room. Please choose another room.`,
                };
            }
        }
        return (
            <Link
                key={dex}
                to={`/chat?room=${dex}&UID=${UID}&gender=${gender}`}
                onClick={(e) => handleEnter(e, noClick, errorMessage)}
            >
                <ListItem
                    backgroundColor="#EDF2F7"
                    margin="5px"
                    padding="10px 15px"
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>Room {dex}</div>
                        <div marginLeft="90%">
                            <Stack isInline>
                                {members.map(({ gender }) => (
                                    <Badge
                                        fontSize="12.5px"
                                        variantColor={
                                            gender === 'male' ? 'blue' : 'pink'
                                        }
                                    >
                                        {gender === 'male' ? 'boy' : 'girl'}
                                    </Badge>
                                ))}
                                {members.length === 0 ? (
                                    <Badge fontSize="12.5px">empty</Badge>
                                ) : (
                                    ''
                                )}
                            </Stack>
                        </div>
                    </div>
                </ListItem>
            </Link>
        );
    };

    return (
        <div className="form">
            <Heading>Rooms</Heading>
            <Divider />
            <Heading as="h4" size="md" textAlign="center" margin="15px 0">
                Online
            </Heading>
            <StatGroup textAlign="center">
                <Stat>
                    <StatLabel style={{ color: '#3182ce' }}>Boys</StatLabel>
                    <StatNumber>{userCount.boys}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel style={{ color: '#d53f8c' }}>Girls</StatLabel>
                    <StatNumber>{userCount.girls}</StatNumber>
                </Stat>
            </StatGroup>
            <Divider />
            <List>
                {rooms.map((room, dex) => renderRoom(room, dex))}
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {error.header}
                        </AlertDialogHeader>
                        <AlertDialogBody>{error.body}</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose} ml={3}>
                                Go Back
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </List>
        </div>
    );
};

export default Rooms;
