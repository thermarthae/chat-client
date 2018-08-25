import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './Chat.style.scss';

import Menu from './Menu/Menu';
import Conversations from './Conversations/Conversations';
import Mailbox from './Mailbox/Mailbox';

interface IChatProps extends RouteComponentProps<{ id: string }> { }

const Chat = (props: IChatProps) => {
	return (
		<div id='chat'>
			<Menu />
			<Conversations />
			<Mailbox oponentId={props.match.params.id} />
		</div>
	);
};
export default Chat;
