import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-apollo-hooks';
import { GET_CONV_ARR, IGetConvArrResponse } from '../Conversations.apollo';

import ConversationList from '../ConversationList/ConversationList';
import FakeConversations from '../FakeConversations/FakeConversations';
import EmptyItem from '../../EmptyItem/EmptyItem';


const UserConversations = () => {
	const [t] = useTranslation();
	const { loading, error, data } = useQuery<IGetConvArrResponse>(GET_CONV_ARR);
	if (loading) return <FakeConversations />;
	if (error) return <EmptyItem msg={error.message} />;

	const { getUserConversations } = data!;
	if (getUserConversations.length === 0) return <EmptyItem msg={t('chat.conversations.nothingToShow')} />;

	return <ConversationList conversationArr={getUserConversations} />;
};

export default UserConversations;
