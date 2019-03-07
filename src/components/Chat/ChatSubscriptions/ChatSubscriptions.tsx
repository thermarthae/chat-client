import React, { useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';

import { NEW_MSG_SUB, INewMsgsSubRes } from './ChatSubscriptions.apollo';
import { GET_CONVERSATION, IGetConvRes, IMessage } from '../Mailbox/Mailbox.apollo';

//Fake component -> doesnt return anything, just subscribe data
const ChatSubscriptions = () => {
	const client = useApolloClient();

	useEffect(() => {
		const sub = client.subscribe<INewMsgsSubRes>({ query: NEW_MSG_SUB }).subscribe({
			next(res) {
				try {
					const newMsg = res.data.newMessageAdded as IMessage;
					const variables = { id: newMsg.conversation, skip: 0, limit: 10 };
					const { getConversation } = client.readQuery<IGetConvRes>({
						query: GET_CONVERSATION,
						variables,
					})!;

					const msgExists = getConversation.messages.find(msg => msg._id === newMsg._id);
					if (!msgExists) client.writeQuery({
						query: GET_CONVERSATION,
						variables,
						data: {
							getConversation: Object.assign({}, getConversation, {
								messages: [...getConversation.messages, newMsg]
							})
						},
					});
				} catch (error) { } // tslint:disable-line
			},
		});

		return () => sub.unsubscribe();
	});

	return null;
};

export default React.memo(ChatSubscriptions);
