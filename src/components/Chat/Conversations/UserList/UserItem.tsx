import * as React from 'react';
// import { Link } from 'react-router-dom';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';

import MoreHoriz from '@material-ui/icons/MoreHoriz';

import { IUser } from '../Serachbox/Searchbox.apollo';

interface IUserItemProps {
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
	user: IUser;
}

const UserItem: React.SFC<IUserItemProps & InjectedIntlProps> = props => {
	const { user, intl: { formatMessage } } = props;

	return (
		// <Link to={'/chat/' + user._id}>
		<ListItem
			component='div'
			className={
				'line'
			}
		>
			<div className='left'>
				<div className='avatar'>
					<div className='status' />
					<Avatar onClick={e => e.preventDefault()}>
						{user.name[0] || ''}
					</Avatar>
				</div>
			</div>
			<div className='center'>
				<span className='name'>
					{user.name || formatMessage({ id: 'chat.conversations.conversationName' })}
				</span>
			</div>
			<div className='right'>
				<IconButton className='menu' onClick={props.handleMenuClick} >
					<MoreHoriz style={{ fontSize: 'inherit' }} />
				</IconButton>
			</div>
		</ListItem>
		// </Link>
	);
};

export default injectIntl(UserItem);
