import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { GET_CONV_ARR, IGetConvArrResponse } from '../Conversations.apollo';

import ConversationList from '../ConversationList/ConversationList';
import FakeConversations from '../FakeConversations/FakeConversations';
import EmptyItem from '../../EmptyItem/EmptyItem';


const UserConversations = () => {
	const { loading, error, data } = useQuery<IGetConvArrResponse>(GET_CONV_ARR);
	if (loading) return <FakeConversations />;
	if (error) return <EmptyItem msg={error.message} />;

	const { getUserConversations } = data!;
	return <ConversationList conversationArr={getUserConversations} />;
};

export default UserConversations;
