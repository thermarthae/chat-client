import * as React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';

import MoreHoriz from '@material-ui/icons/MoreHoriz';

import { IConversation } from './index.apollo';

interface IUserItemProps {
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
	conversation: IConversation;
	oponentId: string;
}

const UserItem: React.SFC<IUserItemProps> = props => {
	const { conversation, oponentId } = props;
	return (
		<Link to={'/chat/' + conversation._id}>
			<ListItem
				component='div'
				className={
					'line'
					+ (conversation.seen ? '' : ' unseen')
					+ (conversation._id === oponentId ? ' active' : '')
				}
			>
				<div className='left'>
					<div className='avatar'>
						<div className='status' />
						<Avatar onClick={e => e.preventDefault()}>
							{(conversation.name) ? conversation.name[0] : 'UPS'}
						</Avatar>
					</div>
				</div>
				<div className='center'>
					<span className='name'>
						{conversation.name || 'Nazwa Konwersacji'}
					</span>
					<span className='message'>
						{conversation.lastMessage.content}
					</span>
				</div>
				<div className='right'>
					<IconButton className='menu' onClick={props.handleMenuClick} >
						<MoreHoriz style={{ fontSize: 'inherit' }} />
					</IconButton>
				</div>
			</ListItem>
		</Link>
	);
};

export default UserItem;
