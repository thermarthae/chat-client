import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import convStyles from './Conversations.style';
import { GET_SEARCH_STATUS, IGetSearchStatusRes } from './Conversations.apollo';

import Header from './Header/Header';
import Searchbox from './Searchbox/Searchbox';
import UserConversations from './UserConversations/UserConversations';

const Conversations = () => {
	const classes = convStyles();
	const { chat: { searchStatus } } = useQuery<IGetSearchStatusRes>(GET_SEARCH_STATUS).data!;

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
