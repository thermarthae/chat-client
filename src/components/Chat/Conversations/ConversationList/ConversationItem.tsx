import * as React from 'react';
import { Link } from 'react-router-dom';

import Line from '../Line/Line'; //TODO

import { IConversation } from '../Conversations.apollo';

interface IConversationItemProps {
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
	conversation: IConversation;
	currentConv: boolean;
	lastMsgId: string;
}
const ConversationItem = React.memo((props: IConversationItemProps) => {
	const { conversation, currentConv, handleMenuClick } = props;

	return (
		<Link to={'/chat/' + conversation._id}>
			<Line
				avatar={conversation.name[0] || ''}
				name={conversation.name}
				message={conversation.messages[0].content}
				isActive={currentConv}
				isUnseen={!conversation.seen}
				handleMenuClick={handleMenuClick}
			/>
		</Link >
	);
});

export default ConversationItem;
