import * as React from 'react';
import { FormattedDate } from 'react-intl';

import Avatar from '@material-ui/core/Avatar';

import MessageItem from './MessageItem';
import { IMessage } from '../Mailbox.apollo';

interface IMessageGroupProps {
	group: IMessage[];
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}


export default class MessageGroup extends React.Component<IMessageGroupProps> {
	public shouldComponentUpdate(nextProps: IMessageGroupProps) {
		if (nextProps.group.length !== this.props.group.length) return true;
		return false;
	}

	public render() {
		const { group, handleMenuClick } = this.props;
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
						{group.map(msg => <MessageItem key={msg._id} message={msg} handleMenuClick={handleMenuClick} />)}
					</div>
				</div>
			</div>
		);
	}
}
