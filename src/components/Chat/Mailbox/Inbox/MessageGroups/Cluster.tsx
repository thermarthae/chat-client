import * as React from 'react';
import { FormattedDate } from 'react-intl';

import Avatar from '@material-ui/core/Avatar';
import clusterStyles from './Cluster.style';

import { IMessage } from '../../Mailbox.apollo';
import Message from './Message';

interface IClusterProps {
	group: IMessage[];
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Cluster = React.memo(({ group, handleMenuClick }: IClusterProps) => {
	const { me, time, author } = group[0]; //first message
	const classes = clusterStyles({});

	return (
		<div className={me ? classes.me : ''} >
			<div className={classes.time}>
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
			<div className={classes.container}>
				{!me && <div className={classes.author}>
					<Avatar>{author.name[0]}</Avatar>
				</div>}
				<div className={classes.list}>
					{group.map(msg =>
						<Message key={msg._id} message={msg} me={me} handleMenuClick={handleMenuClick} />
					)}
				</div>
			</div>
		</div>
	);
},
	(prevProps, nextProps) => {
		if (prevProps.group.length !== nextProps.group.length) return false;
		return true;
	}
);
export default Cluster;
