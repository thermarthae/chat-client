import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ConversationItem from './ConversationItem';
import { IConversation } from '../Conversations.apollo';


interface IConversationListProps {
	conversationArr: IConversation[];
	oponentId?: string;
	subscribe?: () => void;
}

interface IConversationListStates {
	menuAnchorEl: HTMLElement | undefined;
}

export default class ConversationList extends React.PureComponent<IConversationListProps, IConversationListStates> {
	public state = {
		menuAnchorEl: undefined
	};

	public componentDidMount() {
		const { subscribe } = this.props;
		if (subscribe) subscribe();
	}

	public handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		this.setState({ menuAnchorEl: event.currentTarget });
	}

	public handleMenuClose = () => {
		this.setState({ menuAnchorEl: undefined });
	}

	public render() {
		const { conversationArr, oponentId } = this.props;
		const { menuAnchorEl } = this.state;

		return (
			<div className='conversations list'>
				{conversationArr.map(item =>
					<ConversationItem
						key={item._id}
						lastMsgId={item.messages[0]._id}
						handleMenuClick={this.handleMenuClick}
						conversation={item}
						currentConv={item._id === oponentId}
					/>
				)}
				<Menu
					open={Boolean(menuAnchorEl)}
					onClose={this.handleMenuClose}
					anchorEl={menuAnchorEl}
				>
					<MenuItem className='menuItem' onClick={this.handleMenuClose}>
						<FormattedMessage id='menuItem.delete' />
					</MenuItem>
				</Menu>
			</div>
		);
	}
}
