import * as React from 'react';
import { FormattedDate } from 'react-intl';

import Avatar from '@material-ui/core/Avatar';

import Message from './Message';
import { IMessage } from '../Mailbox.apollo';

interface IMessageGroupProps {
	group: IMessage[];
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}


const MessageGroup: React.SFC<IMessageGroupProps> = props => {
	const { group, handleMenuClick } = props;
	const firstMsg = group[0];
	return (
		<div className={'group' + (!firstMsg.me ? ' left' : ' right')}>
			<div className='header'>
				<div className='time'>
					<FormattedDate
						value={new Date(parseInt(firstMsg.time, 10))}
						year='numeric'
						weekday='long'
						month='long'
						day='numeric'
						hour='numeric'
						minute='numeric'
					/>
				</div>
			</div>
			<div className='container'>
				{!firstMsg.me && <div className='author'>
					<Avatar>{firstMsg.author.name[0]}</Avatar>
				</div>}
				<div className='list'>
					{group.map(msg => <Message key={msg._id} message={msg} handleMenuClick={handleMenuClick} />)}
				</div>
			</div>
		</div>
	);
};

export default MessageGroup;
