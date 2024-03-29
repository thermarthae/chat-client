import React, { useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';

import {
	NEW_MSG_SUB, INewMsgsSubRes,
	UPDATED_CONV_SUBSCRIPTION, IUpdatedConvSubRes
} from './ChatSubscriptions.apollo';

import { IConvMailboxFrag, ConvMailboxFragment } from '../Mailbox/Mailbox.apollo';
import {
	GET_CONV_ARR, IGetConvArrResponse,
} from '../Conversations/Conversations.apollo';

//Fake component -> doesnt return anything, just subscribe data
const ChatSubscriptions = () => {
	const client = useApolloClient();

	useEffect(() => {
		const sub = client.subscribe<INewMsgsSubRes>({ query: NEW_MSG_SUB }).subscribe({
			next({ data }) {
				try {
					const { newMessageAdded } = data!;
					const options = {
						id: newMessageAdded.conversation,
						fragment: ConvMailboxFragment,
						fragmentName: 'ConversationMailbox'
					};
					const { messageFeed, ...rest } = client.readFragment<IConvMailboxFrag>(options)!;
					const { node } = messageFeed;

					const msgExists = node.find(msg => msg._id === newMessageAdded._id);
					if (msgExists) return;

					client.writeFragment({
						...options,
						data: {
							...rest,
							seen: newMessageAdded.me,
							messageFeed: {
								...messageFeed,
								node: [...node, newMessageAdded]
							}
						}
					});

					client.writeFragment({
						...options,
						variables: { limit: 1 },
						data: {
							...rest,
							seen: newMessageAdded.me,
							messageFeed: {
								...messageFeed,
								cursor: newMessageAdded._id,
								noMore: false,
								node: [newMessageAdded]
							}
						}
					});
				} catch (error) {
					console.error(error);
				}
			}
		});

		return () => sub.unsubscribe();
	});



	useEffect(() => {
		const sub = client.subscribe<IUpdatedConvSubRes>({ query: UPDATED_CONV_SUBSCRIPTION }).subscribe({
			next({ data }) {
				try {
					//TODO: handle conversation edit (change of name, etc.)
					const { updatedConversation } = data!;
					const query = GET_CONV_ARR;
					const queryRes = client.readQuery<IGetConvArrResponse>({ query });
					if (!queryRes) return;

					const usrConvArr = queryRes.getUserConversations;
					const convExists = usrConvArr.find(c => c._id === updatedConversation._id);
					if (convExists) return;

					client.writeQuery<IGetConvArrResponse>({
						query,
						data: Object.assign({}, queryRes, {
							getUserConversations: [...usrConvArr, updatedConversation]
						})
					});
				} catch (error) {
					console.error(error);
				}
			}
		});

		return () => sub.unsubscribe();
	});

	return null;
};

export default React.memo(ChatSubscriptions);
