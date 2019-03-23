import React, { useEffect } from 'react';
import { useApolloClient, useQuery } from 'react-apollo-hooks';
import convStyles from './Conversations.style';
import {
	GET_SEARCH_STATUS, IGetSearchStatusRes,
	GET_CONV_ARR, IGetConvArrResponse,
	UPDATED_CONV_SUBSCRIPTION, IUpdatedConvSubRes,
	GET_SUB_STATUS, IGetConvSubStatusRes, TOGGLE_CONV_SUB_STATUS
} from './Conversations.apollo';

import Header from './Header/Header';
import Searchbox from './Searchbox/Searchbox';
import UserConversations from './UserConversations/UserConversations';

const Conversations = () => {
	const classes = convStyles();
	const { chat: { searchStatus } } = useQuery<IGetSearchStatusRes>(GET_SEARCH_STATUS).data!;
	const client = useApolloClient();

	useEffect(() => {
		const { subscriptions } = client.readQuery<IGetConvSubStatusRes>({ query: GET_SUB_STATUS })!;
		if (subscriptions.conversations) return;

		client.mutate({ mutation: TOGGLE_CONV_SUB_STATUS });
		client.subscribe<{ data: IUpdatedConvSubRes }>({
			query: UPDATED_CONV_SUBSCRIPTION,
		}).subscribe({
			next({ data }) {
				try {
					const updatedConv = data.updatedConversation;
					const { getUserConversations } = client.readQuery<IGetConvArrResponse>({ query: GET_CONV_ARR })!;
					const convArr = getUserConversations;

					const convExist = convArr.find(cnv => cnv._id === updatedConv._id);
					if (convExist) return;

					client.writeQuery({
						query: GET_CONV_ARR,
						data: {
							getUserConversations: [...convArr, updatedConv],
						}
					});
				} catch (err) { } // tslint:disable-line
			},
			error(err) { console.error('Conversations subscription error:', err); },
		});
	}, []);

	return (
		<div className={classes.root}>
			<div className={classes.widthFix}>
				<Header />
				<Searchbox searchStatus={searchStatus} />
				{!searchStatus && <UserConversations />}
			</div>
		</div>
	);
};

export default Conversations;
