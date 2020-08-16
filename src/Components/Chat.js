import React, { useEffect, useState } from "react";
import queryString from "query-string";
import ChatMessage from './ChatMessage';
import io from "socket.io-client";
import { Heading, Divider, Input, Box, Button } from "@chakra-ui/core";
import "../Styles/Chat.css";
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
		})
	}, [])
	
	const sendMessage = (message) => {
		if (message) {
			socket.emit("sendMessage", message, () => setMessage(""));
		}
	};
	
	return (
		<div className="form">
			<Heading>Chat</Heading>
			<Divider />
			<Box>
				<Box style={{ clear: "both" }}>
					{messages.map((message, dex) => (<ChatMessage message = {message.message} gender = {gender} dex = {dex} userGender = {message.gender}/>))}
				</Box>
				<Input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={(e) => (e.key === "Enter" ? sendMessage(message) : null)}
				/>
			</Box>
			<Button onClick={() => sendMessage(message)}>Send</Button>
		</div>
	)
}

export default Chat;