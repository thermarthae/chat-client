import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import UserItem from './UserItem';
import { IUser } from '../Serachbox/Searchbox.apollo';


interface IUserListProps {
	userArr: IUser[];
}

interface IUserListStates {
	menuAnchorEl: HTMLElement | undefined;
}

class UserList extends React.PureComponent<IUserListProps, IUserListStates> {
	public state = {
		menuAnchorEl: undefined
	};

	public handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		this.setState({ menuAnchorEl: event.currentTarget });
	}

	public handleMenuClose = () => {
		this.setState({ menuAnchorEl: undefined });
	}

	public render() {
		const { userArr } = this.props;
		const { menuAnchorEl } = this.state;

		return (
			<div className='users list'>
				{userArr.map(item =>
					<UserItem
						key={item._id}
						handleMenuClick={this.handleMenuClick}
						user={item}
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

export default UserList;
