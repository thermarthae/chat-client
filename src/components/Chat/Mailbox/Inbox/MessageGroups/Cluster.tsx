import * as React from 'react';
import { FormattedDate } from 'react-intl';

import Avatar from '@material-ui/core/Avatar';

import { IMessage } from '../../Mailbox.apollo';
import Message from './Message';

interface IClusterProps {
	group: IMessage[];
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default class Cluster extends React.Component<IClusterProps> {
	public shouldComponentUpdate(nextProps: IClusterProps) {
		if (nextProps.group.length !== this.props.group.length) return true;
		return false;
	}

	public render() {
		const { group, handleMenuClick } = this.props;
		const { me, time, author } = group[0]; //first message

		return (
			<div className={'group' + (!me ? ' left' : ' right')}>
				<div className='header'>
					<div className='time'>
						<FormattedDate
							value={new Date(time)}
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
					{!me && <div className='author'>
						<Avatar>{author.name[0]}</Avatar>
					</div>}
					<div className='list'>
						{group.map(msg =>
							<Message key={msg._id} message={msg} handleMenuClick={handleMenuClick} />
						)}
					</div>
				</div>
			</div>
		);
	}
}