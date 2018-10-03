import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './Chat.style.scss';

import Menu from './Menu/Menu';
import Conversations from './Conversations/Conversations';
import Mailbox from './Mailbox/Mailbox';

interface IChatProps extends RouteComponentProps<{ oponentId?: string }> { }

export default class Chat extends React.Component<IChatProps> {
	public shouldComponentUpdate(nextProps: IChatProps) {
		if (JSON.stringify(this.props.match) !== JSON.stringify(nextProps.match)) return true;
		return false;
	}

	public render() {
		const oponentId = this.props.match.params.oponentId;

		return (
			<div id='chat'>
				<Menu />
				<Conversations oponentId={oponentId} />
				<Mailbox oponentId={oponentId} />
			</div>
		);
	}
}
