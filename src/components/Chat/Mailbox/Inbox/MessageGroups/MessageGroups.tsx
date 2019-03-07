import React from 'react';
import { IMessageMailboxFrag } from '../../Mailbox.apollo';

import Cluster from './Cluster';

interface IMessageGroups {
	messages: IMessageMailboxFrag[];
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const MessageGroups = ({ messages, handleMenuClick }: IMessageGroups) => {
	let lastMsg = messages[0];
	let currentGroup: IMessageMailboxFrag[] = [];
	const msgGroups: IMessageMailboxFrag[][] = [];

	messages.forEach(msg => {
		const msgTime = new Date(msg.time).getTime();
		const lastMsgTime = new Date(lastMsg.time).getTime();
		const moreThan2h = msgTime - lastMsgTime > 1000 * 60 * 60 * 2;
		if (lastMsg.me === msg.me && !moreThan2h) currentGroup.push(msg);
		else {
			msgGroups.push(currentGroup);
			currentGroup = [msg];
		}
		lastMsg = msg;
	});
	msgGroups.push(currentGroup);

	return (
		<div>
			{msgGroups.map(grp => <Cluster
				key={'G-' + grp[0].time} //TODO: fix key
				group={grp}
				handleMenuClick={handleMenuClick}
			/>)}
		</div>
	);
};

export default React.memo(MessageGroups);
