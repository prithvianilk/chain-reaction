import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { Alert, AlertIcon, Heading, Input, List, ListItem } from '@chakra-ui/core';

let socket;

const Chat = ({ location }) => {
	const ENDPOINT = 'localhost:5000';
	const [srn, setSRN] = useState('');
	const [gender, setGender] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const { gender, srn } = queryString.parse(location.search);
		socket = io(ENDPOINT);

		setSRN(srn);
		setGender(gender);

		socket.emit('join', { srn, gender, roomNumber: 0 }, (error) => {
			console.log(error);
		});

		return () => {
			socket.emit('disconnect');
			socket.off();
		}

	}, [ENDPOINT, location.search]);


	useEffect(() => {
		socket.on('message', (message) => {
			setMessages(messages => [...messages, message]);
		})
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	}

	const renderListItem = (message, gender, dex) => {
		if (gender === undefined) {
			return (
				<Alert key = {dex} status="success">
					<AlertIcon />
					{message}
				</Alert>
			)
		}

		return (
			<ListItem key={dex} style={{ color: `${gender === "male" ? '#3182ce' : '#d53f8c'}` }}>
				{message}
			</ListItem>
		)
	}

	return (
		<div className="form">
			<Heading>Chat</Heading>
			<List>
				{messages.map(({ message, gender }, dex) => (
					renderListItem(message, gender, dex)
				))}
			</List>
			<Input value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key == "Enter" ? sendMessage(e) : null} />
		</div>
	)
}

export default Chat;