import React from 'react';
import { Alert, AlertIcon, Box } from '@chakra-ui/core'

const ChatMessage = ({ message, userGender, dex, gender, type }) => {
    if (userGender === undefined) {
        console.log(type);
        return (
            <div>
                <Alert key={dex} status={type} margin="5px 0">
                    <AlertIcon />
                    {message}
                </Alert>
            </div>
        );
    };
    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="column"
            alignItems={`flex-${userGender === gender ? 'end' : 'start'}`}
            margin="10px 0"
        >
            <Box
                wordBreak="break-word"
                key={dex}
                color="white"
                marginX="10px"
                backgroundColor={userGender === "male" ? "#3182ce" : "#d53f8c"}
                padding="5px 10px"
                borderRadius="15px"
            >
                {message}
            </Box>
        </Box>
    )
}

export default ChatMessage;