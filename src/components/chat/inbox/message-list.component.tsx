import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MessageItem from './message-item.component';
import { IMessage } from './index.apollo';

interface IMessageListProps {
	messages: [IMessage];
}

interface IMessageListState {
	menuAnchorEl: HTMLElement | undefined;
}

class MessageList extends React.PureComponent<IMessageListProps, IMessageListState> {
	private msgs: any;

	public state = {
		menuAnchorEl: undefined,
	};

	public componentDidMount() {
		this.scrollToBottom('instant');
	}

	public componentDidUpdate() {
		this.scrollToBottom('smooth');
	}

	private scrollToBottom(behavior: 'smooth' | 'instant') {
		this.msgs.scrollIntoView({ behavior, block: 'end', inline: 'end' });
	}

	private handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		const target = event.currentTarget;

		this.setState(prevState => ({
			menuAnchorEl: !prevState.menuAnchorEl ? target : undefined
		}));
	}

	public render() {
		const { messages } = this.props;
		const { menuAnchorEl } = this.state;

		return (
			<div className='messageList'>
				<div ref={msgs => { this.msgs = msgs; }}>
					{messages.map(
						msg => <MessageItem key={msg._id} message={msg} handleMenuClick={this.handleMenuClick} />
					)}
				</div>
				<Menu
					open={Boolean(menuAnchorEl)}
					onClose={this.handleMenuClick}
					anchorEl={menuAnchorEl}
				>
					<MenuItem className='menuItem' onClick={this.handleMenuClick}>
						<FormattedMessage id='chat.inbox.menuItem.delete' />
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default MessageList;
