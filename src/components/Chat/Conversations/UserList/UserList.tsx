import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Line from '../Line/Line';
import { IUser } from '../Searchbox/Searchbox.apollo';
import List from '../List';


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
			<List>
				{userArr.map(item =>
					<Line
						key={item._id}
						avatar={item.name[0]}
						name={item.name}
						handleMenuClick={this.handleMenuClick}
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
	}
}

export default UserList;
