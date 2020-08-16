import React, { useState } from "react";
import {
    Button,
    Box,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    Heading,
} from "@chakra-ui/core";
import Logo from "./Logo";
import "../Styles/Form.css";
import { Link } from "react-router-dom";

const Form = () => {
    const [srn, SetSRN] = useState("");

    return (
        <div className="form">
            <div className="description">
                <Logo />
                <Heading textAlign="center" fontSize="5xl" margin="10px 0">
                    Chain Reaction
                </Heading>
                <Text fontSize="lg" margin="30px 0">
                    Whether you’re part of a school club, gaming group, worldwide art
                    community, or just a handful of friends that want to spend time
                    together, Discord makes it easy to talk every day and hang out more
                    often.
                </Text>
            </div>
            <div className="input-group">
                <InputGroup>
                    <InputLeftAddon children="SRN" />
                    <Input
                        roundedLeft="0"
                        placeholder="SEPGU191SC***"
                        value={srn}
                        onChange={(e) => SetSRN(e.target.value)}
                    />
                </InputGroup>
            </div>
            <Box display="flex" justifyContent="center" marginTop = "20px">
                <Link onClick={e => (!srn) ? e.preventDefault() : null} to={`/rooms?srn=${srn}&gender=male`}>
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
                <Link onClick={e => (!srn) ? e.preventDefault() : null} to={`/rooms?srn=${srn}&gender=female`}>
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
    );
};

export default Form;
