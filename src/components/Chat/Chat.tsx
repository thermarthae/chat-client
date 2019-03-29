import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Conversations from './Conversations/Conversations';
import Mailbox from './Mailbox/Mailbox';
import ChatSubscriptions from './ChatSubscriptions/ChatSubscriptions';

import ChatOponentIDCtx from '@src/context/ChatOponentID';
import chatStyles from './Chat.style';

interface IChatProps extends RouteComponentProps<{ oponentId?: string }> { }

const Chat = ({ match }: IChatProps) => {
	const oponentId = match.params.oponentId;
	const classes = chatStyles();


	return (
		<ChatOponentIDCtx.Provider value={oponentId}>
			<div className={classes.root}>
				<Conversations />
				<Mailbox oponentId={oponentId} />
				<ChatSubscriptions />
			</div>
		</ChatOponentIDCtx.Provider>
	);
};

export default Chat;
