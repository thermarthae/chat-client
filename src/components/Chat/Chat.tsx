import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import Conversations from './Conversations/Conversations';
import Mailbox from './Mailbox/Mailbox';
import ChatSubscriptions from './ChatSubscriptions/ChatSubscriptions';

import { SET_OPONENT_ID } from './Chat.apollo';
import chatStyles from './Chat.style';

interface IChatProps extends RouteComponentProps<{ oponentId?: string }> { }

const Chat = ({ match }: IChatProps) => {
	const oponentId = match.params.oponentId;
	const classes = chatStyles();

	const setOponentId = useMutation(SET_OPONENT_ID, { variables: { id: oponentId } });
	setOponentId();

	return (
		<div className={classes.root}>
			<Conversations />
			<Mailbox oponentId={oponentId} />
			<ChatSubscriptions />
		</div>
	);
};

export default Chat;
