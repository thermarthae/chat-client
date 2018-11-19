import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './Chat.style.scss';

import Menu from './Menu/Menu';
import Conversations from './Conversations/Conversations';
import Mailbox from './Mailbox/Mailbox';
import { Mutation } from 'react-apollo';
import { SET_OPONENT_ID } from './Chat.apollo';

interface IChatProps extends RouteComponentProps<{ oponentId?: string }> { }

export default class Chat extends React.Component<IChatProps> {
	public shouldComponentUpdate(nextProps: IChatProps) {
		if (JSON.stringify(this.props.match) !== JSON.stringify(nextProps.match)) return true;
		return false;
	}

	public render() {
		const oponentId = this.props.match.params.oponentId;

		return (
			<Mutation mutation={SET_OPONENT_ID} ignoreResults>
				{setOponentId => {
					setOponentId({ variables: { id: oponentId } });
					return (
						<div id='chat'>
							<Menu />
							<Conversations />
							<Mailbox />
						</div>
					);
				}}
			</Mutation>
		);
	}
}
