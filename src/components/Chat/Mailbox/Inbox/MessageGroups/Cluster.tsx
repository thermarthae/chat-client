import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import clusterStyles from './Cluster.style';

import { IMessageMailboxFrag } from '../../Mailbox.apollo';
import Message from './Message';
import Time from '@src/components/Time/Time';

interface IClusterProps {
	group: IMessageMailboxFrag[];
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Cluster = React.memo(({ group, handleMenuClick }: IClusterProps) => {
	const { me, time, author } = group[0]; //first message
	const classes = clusterStyles();

	return (
		<div className={me ? classes.me : ''} >
			<Time time={time} color='textSecondary' variant='subtitle2' align='center' />
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
