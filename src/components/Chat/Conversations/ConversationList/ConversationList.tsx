import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Query } from 'react-apollo';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from './../List';

import { GET_OPONENT_ID, IGetOponentIdResponse } from './ConversationList.apollo';
import ConversationItem from './ConversationItem';
import { IConversation } from '../Conversations.apollo';


interface IConversationListProps {
	conversationArr: IConversation[];
}

interface IConversationListStates {
	menuAnchorEl: HTMLElement | undefined;
}

export default class ConversationList extends React.PureComponent<IConversationListProps, IConversationListStates> {
	public state = {
		menuAnchorEl: undefined
	};

	private handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		this.setState({ menuAnchorEl: event.currentTarget });
	}

	private handleMenuClose = () => {
		this.setState({ menuAnchorEl: undefined });
	}

	public render() {
		const { conversationArr } = this.props;
		const { menuAnchorEl } = this.state;

		return (
			<Query<IGetOponentIdResponse> query={GET_OPONENT_ID}>
				{({ data }) => {
					const { chat: { oponentId } } = data!;
					return (
						<List>
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
						</List>
					);
				}}
			</Query>
		);
	}
}
