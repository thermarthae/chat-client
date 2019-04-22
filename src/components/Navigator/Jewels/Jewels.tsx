import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import LinkIconButton from '@src/components/LinkButtons/LinkIconButton';
import LazyBadge from '@src/components/LazyBadge/LazyBadge';

import { IGetConvSeenRes, GET_CONV_SEEN } from './Jewels.apollo';

interface IJewelsProps {
	onLogout: () => Promise<void>;
}
const Jewels = ({ onLogout }: IJewelsProps) => {
	let unreadCount: number | string = ':(';

	const { loading, error, data } = useQuery<IGetConvSeenRes>(GET_CONV_SEEN);

	if (error) console.error(error);
	else if (!loading && data) {
		let count = 0;
		data.getUserConversations.forEach(c => !c.seen && count++);
		unreadCount = count;
	}

	return (
		<div>
			<LinkIconButton exact={false} to='/chat'>
				<LazyBadge color='error' badgeContent={unreadCount} loading={loading}>
					<MailIcon titleAccess='Chat' />
				</LazyBadge>
			</LinkIconButton>
			<LinkIconButton to='/login'>
				<AccountCircle titleAccess='Login' />
			</LinkIconButton>
			<IconButton color='inherit' onClick={onLogout}>
				<PowerSettingsNew titleAccess='Logout' />
			</IconButton>
		</div>
	);
};

export default Jewels;
