import React, { useState } from 'react';
import {
    Button,
    Box,
    Input,
    InputGroup,
    InputLeftAddon,
    List,
    ListItem,
    Heading,
} from '@chakra-ui/core';
import Logo from './Logo';
import '../Styles/Form.css';
import { Link } from 'react-router-dom';
import '../Styles/Land.css';

const Land = () => {
    const [UID, setUID] = useState('');
    return (
        <div className="container">
            <div className="form">
                <div className="description">
                    <Logo />
                    <Heading textAlign="center" fontSize="5xl" margin="10px 0">
                        Chain Reaction
                    </Heading>
                    <List fontSize="lg" margin="30px 0">
                        <ListItem listStyleType="circle">
                            Chat with random boys or girls from your university,
                            with complete anonymity
                        </ListItem>
                        <ListItem listStyleType="circle">
                            Enter one on one rooms with another person and
                            figure out if they are your type of guy / gal
                        </ListItem>
                        <ListItem listStyleType="circle">
                            If they are being annoying or just plain mean, you
                            can leave the room and join another one
                        </ListItem>
                        <ListItem listStyleType="circle">
                            If you both like each other, you can exchange phone
                            numbers and continue the conversation on whatsapp
                        </ListItem>
                    </List>
                </div>
                <div className="input-group">
                    <InputGroup>
                        <InputLeftAddon children="UID" />
                        <Input
                            roundedLeft="0"
                            placeholder="********CS001"
                            value={UID}
                            onChange={(e) => setUID(e.target.value)}
                        />
                    </InputGroup>
                </div>
                <Box display="flex" justifyContent="center" marginTop="20px">
                    <Link
                        onClick={(e) => (!UID ? e.preventDefault() : null)}
                        to={`/rooms?UID=${UID}&gender=male`}
                    >
                        <Button
                            variantColor="blue"
                            size="md"
                            borderRadius="28px"
                            padding="5px 35px"
                            margin="0 10px"
                        >
                            Boy
                        </Button>
                    </Link>
                    <Link
                        onClick={(e) => (!UID ? e.preventDefault() : null)}
                        to={`/rooms?UID=${UID}&gender=female`}
                    >
                        <Button
                            variantColor="pink"
                            size="md"
                            borderRadius="28px"
                            padding="5px 35px"
                            margin="0 10px"
                        >
                            Girl
                        </Button>
                    </Link>
                </Box>
            </div>
        </div>
    );
};

export default Land;
