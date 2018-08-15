import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MessageItem from './message-item.component';
import { IGetConversationResponse, IMessage } from './index.apollo';
import { MESSAGES_SUBSCRIPTION, INewMessageAdded } from './message-list.apollo';

interface IMessageListProps {
	messages: [IMessage];
	subscribeToMore: any;
	oponentId: string;
}

interface IMessageListState {
	menuAnchorEl: HTMLElement | undefined;
}

class MessageList extends React.PureComponent<IMessageListProps, IMessageListState> {
	private msgs: any;
	private unsubscribe: any;

	public state = {
		menuAnchorEl: undefined,
	};

	public componentDidMount() {
		this.scrollToBottom('instant');
		const { subscribeToMore, oponentId } = this.props;
		this.unsubscribe = subscribeToMore({
			document: MESSAGES_SUBSCRIPTION,
			updateQuery: (prev: IGetConversationResponse, { subscriptionData }: { subscriptionData: INewMessageAdded }) => {
				if (!subscriptionData.data) return prev;
				const newMessageAdded = subscriptionData.data.newMessageAdded;
				const messagesArr = prev.getConversation.messages;
				console.log('oponentId', oponentId);
				if (newMessageAdded.conversation === oponentId && !messagesArr.find(msg => msg._id === newMessageAdded._id))
					return Object.assign({}, prev, {
						getConversation: Object.assign({}, prev.getConversation, {
							messages: [...messagesArr, newMessageAdded]
						})
					});
				return prev;
			}
		});
	}

	public componentWillUnmount() {
		this.unsubscribe();
	}

	public componentDidUpdate() {
		this.scrollToBottom('smooth');
	}

	private scrollToBottom = (behavior: 'smooth' | 'instant') => {
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
