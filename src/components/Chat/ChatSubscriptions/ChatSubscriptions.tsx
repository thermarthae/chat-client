import React, { useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';

import { NEW_MSG_SUB, INewMsgsSubRes } from './ChatSubscriptions.apollo';
import { IConvMailboxFrag, ConvMailboxFragment } from '../Mailbox/Mailbox.apollo';

//Fake component -> doesnt return anything, just subscribe data
const ChatSubscriptions = () => {
	const client = useApolloClient();

	useEffect(() => {
		const sub = client.subscribe<INewMsgsSubRes>({ query: NEW_MSG_SUB }).subscribe({
			next({ data: { newMessageAdded } }) {
				try {
					const options = {
						id: newMessageAdded.conversation,
						fragment: ConvMailboxFragment,
					};
					const { messages, ...rest } = client.readFragment<IConvMailboxFrag>(options)!;

					const msgExists = messages.find(msg => msg._id === newMessageAdded._id);
					if (msgExists) return;

					client.writeFragment({
						...options,
						data: {
							...rest,
							messages: [...messages, newMessageAdded]
						}
					});
				} catch (error) { } // tslint:disable-line
			},
		});

		return () => sub.unsubscribe();
	});

	return null;
};

export default React.memo(ChatSubscriptions);
