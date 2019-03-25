import React, { useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';

import {
	NEW_MSG_SUB, INewMsgsSubRes,
	UPDATED_CONV_SUBSCRIPTION, IUpdatedConvSubRes
} from './ChatSubscriptions.apollo';

import { ConversationMailboxFragment, ConversationMailboxFragmentDoc } from '@codegen';
import {
	GET_CONV_ARR, IGetConvArrResponse,
	ConvNavFragment, IConvNavFragment,
} from '../Conversations/Conversations.apollo';

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
						fragment: ConversationMailboxFragmentDoc,
						fragmentName: 'ConversationMailbox'
					};
					const { messages, ...rest } = client.readFragment<ConversationMailboxFragment>(options)!;

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

				try {
					const options = {
						id: newMessageAdded.conversation,
						fragment: ConvNavFragment,
						fragmentName: 'ConversationNav'
					};
					const { messages, ...rest } = client.readFragment<IConvNavFragment>(options)!;

					const msgExists = messages[0]._id === newMessageAdded._id;
					if (msgExists) return;

					client.writeFragment({
						...options,
						data: {
							...rest,
							messages: [newMessageAdded]
						}
					});
				} catch (error) {
					if (!error.message.includes('Can\'t find field messages({\"limit\":1})')) console.error(error);
				}
			}
		});

		return () => sub.unsubscribe();
	});



	useEffect(() => {
		const sub = client.subscribe<ISub<IUpdatedConvSubRes>>({ query: UPDATED_CONV_SUBSCRIPTION }).subscribe({
			next({ data: { updatedConversation } }) {
				try {
					//TODO: handle conversation edit (change of name, etc.)
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
