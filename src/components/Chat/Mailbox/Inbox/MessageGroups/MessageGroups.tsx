import * as React from 'react';
import { IMessage } from '../../Mailbox.apollo';

import Cluster from './Cluster';

interface IMessageGroups {
	messages: IMessage[];
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const MessageGroups = ({ messages, handleMenuClick }: IMessageGroups) => {
	let lastMsg = messages[0];
	let currentGroup: IMessage[] = [];
	const msgGroups: IMessage[][] = [];

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
		<>
			{msgGroups.map(grp => <Cluster
				key={'G-' + grp[0].time} //TODO: fix key
				group={grp}
				handleMenuClick={handleMenuClick}
			/>)}
		</>
	);
};

export default React.memo(MessageGroups);
