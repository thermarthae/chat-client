import React, { useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';

import { NEW_MSG_SUB, INewMsgsSubRes } from './ChatSubscriptions.apollo';
import { IConvMailboxFrag, ConvMailboxFragment } from '../Mailbox/Mailbox.apollo';

interface ISub<T> {
	data: T;
}

//Fake component -> doesnt return anything, just subscribe data
const ChatSubscriptions = () => {
	const client = useApolloClient();

	useEffect(() => {
		const sub = client.subscribe<ISub<INewMsgsSubRes>>({ query: NEW_MSG_SUB }).subscribe({
			next({ data: { newMessageAdded } }) {
				try {
					const options = {
						id: newMessageAdded.conversation,
						fragment: ConvMailboxFragment,
						fragmentName: 'ConversationMailbox'
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
				} catch (error) {
					if (!error.message.includes('Can\'t find field messages({})')) console.error(error);
				}
			}
		});

		return () => sub.unsubscribe();
	});

	return null;
};

export default React.memo(ChatSubscriptions);
