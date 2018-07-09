import * as React from 'react';

import { injectIntl, InjectedIntlProps } from 'react-intl';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import UserItem from './user-item.component';
import { IConversation } from './index.apollo';


interface IUserListProps {
	oponentId: string;
	conversationArr: [IConversation];

}

interface IUserListStates {
	menuAnchorEl: HTMLElement | undefined;
}

class UserList extends React.PureComponent<IUserListProps & InjectedIntlProps, IUserListStates> {
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
		const { conversationArr, oponentId, intl: { formatMessage } } = this.props;
		const { menuAnchorEl } = this.state;

		return (
			<div className='list'>
				{conversationArr.map(item =>
					<UserItem
						key={item._id}
						handleMenuClick={this.handleMenuClick}
						conversation={item}
						oponentId={oponentId}
					/>
				)}
				<Menu
					open={Boolean(menuAnchorEl)}
					onClose={this.handleMenuClose}
					anchorEl={menuAnchorEl}
				>
					<MenuItem className='menuItem' onClick={this.handleMenuClose}>
						{formatMessage({ id: 'chat.users.menuItem.delete' })}
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default injectIntl(UserList);
