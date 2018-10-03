import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './Chat.style.scss';

import Menu from './Menu/Menu';
import Conversations from './Conversations/Conversations';
import Mailbox from './Mailbox/Mailbox';

interface IChatProps extends RouteComponentProps<{ oponentId?: string }> { }

const Chat: React.SFC<IChatProps> = props => {
	const oponentId = props.match.params.oponentId;

	return (
		<div id='chat'>
			<Menu />
			<Conversations oponentId={oponentId} />
			<Mailbox oponentId={oponentId} />
		</div>
	);
};
export default Chat;
