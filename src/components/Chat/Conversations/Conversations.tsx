import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Query from 'react-apollo/Query';

import './Conversations.style.scss';
import { GET_CHAT_FILTER, TInboxFilter, GET_CONV_ARR, IGetConvArrResponse } from './Conversations.apollo';

import Searchbox from './Searchbox';
import ConversationList from './ConversationList/ConversationList';
import FakeConversations from './FakeConversations';
import EmptyItem from './EmptyItem';

const Conversations = () => {
	return (
		<Query query={GET_CHAT_FILTER} >
			{({ data: { chat: { inboxFilter } } }) => {
				return (
					<div id='conversations'>
						<Searchbox inboxFilter={inboxFilter} />
						<Query query={GET_CONV_ARR} >
							{({ loading, error, data }) => {
								if (error) return `Error! ${error.message}`;
								if (loading) return <FakeConversations />;

								const {
									userConversations: { conversationArr }
								}: IGetConvArrResponse = data;

								let filteredConv = [];
								switch (inboxFilter as TInboxFilter) { //TODO: mem cache
									case 'SEARCH':
										return null;
										break;
									case 'DRAFT':
										filteredConv = conversationArr.filter(conv => conv.draft);
										break;
									case 'UNREAD':
										filteredConv = conversationArr.filter(conv => !conv.seen);
										break;
									default:
										filteredConv = conversationArr;
										break;
								}

								if (!filteredConv[0]) return <EmptyItem>
									<FormattedMessage id='chat.conversations.nothingToShow' />
								</EmptyItem>;

								return <ConversationList conversationArr={filteredConv} />;
							}}
						</Query>
					</div>
				);
			}}
		</Query>
	);
};

export default Conversations;
