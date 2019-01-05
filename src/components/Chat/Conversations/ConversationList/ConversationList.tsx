import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import OptionList from '@src/components/OptionList/OptionList';
import List from './../List';
import Line from '../Line/Line';

import { GET_OPONENT_ID, IGetOponentIdResponse } from './ConversationList.apollo';
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
								<Link to={'/chat/' + item._id} key={item._id}>
									<Line
										avatar={item.name[0]}
										name={item.name}
										message={item.messages[0].content}
										isActive={item._id === oponentId}
										isUnseen={!item.seen}
										handleMenuClick={this.handleMenuClick}
									/>
								</Link>
							)}
							<Menu
								open={Boolean(menuAnchorEl)}
								onClose={this.handleMenuClose}
								anchorEl={menuAnchorEl}
							>
								<OptionList onClick={this.handleMenuClose}>
									<FormattedMessage id='optionList.delete' />
								</OptionList>
							</Menu>
						</List>
					);
				}}
			</Query>
		);
	}
}
