import * as React from 'react';

import Line from '../Line/Line';
import { IUser } from '../Serachbox/Searchbox.apollo';

interface IUserItemProps {
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
	user: IUser;
}

const UserItem: React.SFC<IUserItemProps> = props => {
	const { user } = props;

	return (
		<Line
			avatar={user.name[0]}
			name={user.name}
			handleMenuClick={props.handleMenuClick}
		/>
	);
};

export default UserItem;
