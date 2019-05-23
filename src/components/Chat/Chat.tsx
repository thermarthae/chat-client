import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Conversations from './Conversations/Conversations';
import Mailbox from './Mailbox/Mailbox';
import ChatSubscriptions from './ChatSubscriptions/ChatSubscriptions';

import ChatFriendlyConvIDCtx from '@src/context/ChatFriendlyConvID';
import chatStyles from './Chat.style';

interface IChatProps extends RouteComponentProps<{ friendlyConvID?: string }> { }

const Chat = ({ match }: IChatProps) => {
	const { friendlyConvID } = match.params;
	const classes = chatStyles();

	return (
		<ChatFriendlyConvIDCtx.Provider value={friendlyConvID}>
			<div className={classes.root}>
				<Conversations />
				<Mailbox friendlyConvID={friendlyConvID} />
				<ChatSubscriptions />
			</div>
		</ChatFriendlyConvIDCtx.Provider>
	);
};

export default Chat;
