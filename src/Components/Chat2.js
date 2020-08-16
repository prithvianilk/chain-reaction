import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Alert, AlertIcon, Heading, Input, Box, Button } from "@chakra-ui/core";
import "../Styles/Chat.css";
import "../Styles/Form.css";
import "../Styles/Land.css";
let socket;

const Chat = ({ location }) => {
	const ENDPOINT = "localhost:5000";
	const [srn, setSRN] = useState("");
	const [gender, setGender] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const { room, gender, srn } = queryString.parse(location.search);
		socket = io(ENDPOINT);

		setSRN(srn);
		setGender(gender);

		socket.emit("join", { srn, gender, roomNumber: room }, (error) => {
			console.log(error);
		});

		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages((messages) => [...messages, message]);
		});
	}, []);

	const sendMessage = (message) => {
		if (message) {
			socket.emit("sendMessage", message, () => setMessage(""));
		}
	};

	const renderListItem = (message, userGender, dex) => {
		if (userGender === undefined) {
			return (
				<div>
					<Alert key={dex} status="success" margin="5px 0">
						<AlertIcon />
						{message}
					</Alert>
				</div>
			);
		}

		return (
			<div>
				<Box
					key={dex}
					color="white"
					backgroundColor={userGender === "male" ? "#3182ce" : "#d53f8c"}
					display="table"
					margin="10px 0"
					padding="5px 10px"
					borderRadius="15px"
					wordBreak="break-word"
					style={{
						float: `${userGender === gender ? "right" : "left"}`,
						boxSizing: "border-box ",
						clear: `${userGender === gender ? "right" : "left"}`,
					}}
				>
					{message}
				</Box>
			</div>
		);
	};

	return (
		<div className="form">
			<Heading>Chat</Heading>
			<div>
				<Box style={{ clear: "both" }}>
					{messages.map(({ message, gender }, dex) =>
						renderListItem(message, gender, dex)
					)}
				</Box>
				<Input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={(e) => (e.key === "Enter" ? sendMessage(message) : null)}
				/>
			</div>
			<Button onClick={() => sendMessage(message)}>Send</Button>
		</div>
	);
};

export default Chat;