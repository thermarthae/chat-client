import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter, RouteComponentProps } from 'react-router';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import UserItem from './user-item.component';
import { IConversation } from '../index.apollo';


interface IUserListProps extends RouteComponentProps<{ id: string }> {
	conversationArr: [IConversation];
}

interface IUserListStates {
	menuAnchorEl: HTMLElement | undefined;
}

class UserList extends React.PureComponent<IUserListProps, IUserListStates> {
	public state = {
		menuAnchorEl: undefined,
	};

	public handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		this.setState({ menuAnchorEl: event.currentTarget });
	}

	public handleMenuClose = () => {
		this.setState({ menuAnchorEl: undefined });
	}

	public render() {
		const { conversationArr } = this.props;
		const { menuAnchorEl } = this.state;

		return (
			<div className='list'>
				{conversationArr.map(item =>
					<UserItem
						key={item._id}
						handleMenuClick={this.handleMenuClick}
						conversation={item}
						oponentId={this.props.match.params.id}
					/>
				)}
				<Menu
					open={Boolean(menuAnchorEl)}
					onClose={this.handleMenuClose}
					anchorEl={menuAnchorEl}
				>
					<MenuItem className='menuItem' onClick={this.handleMenuClose}>
						<FormattedMessage id='chat.users.menuItem.delete' />
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default withRouter(UserList);
