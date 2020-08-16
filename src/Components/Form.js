import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
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
            <div className="btn-group">
                <ButtonGroup spacing={10}>
                    <Button
                        variantColor="blue"
                        size="md"
                        onClick={e => e.preventDefault()}
                        borderRadius="28px"
                        padding="5px 35px"
                    >
                        <Link onClick={e => (!srn) ? e.preventDefault() : null} to={`/rooms?srn=${srn}&gender=male`}>
                            Boy
                        </Link>
                    </Button>
                    <Button
                        variantColor="pink"
                        size="md"
                        onClick={e => e.preventDefault()}
                        borderRadius="28px"
                        padding="5px 35px"
                    >
                        <Link onClick={e => (!srn) ? e.preventDefault() : null} to={`/rooms?srn=${srn}&gender=female`}>
                            Girl
                        </Link>
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default Form;
