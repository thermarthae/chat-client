import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Query from 'react-apollo/Query';

import './Conversations.style.scss';
import { GET_CHAT_FILTER, TInboxFilter, GET_CONV_ARR, IGetConvArrResponse } from './Conversations.apollo';

import Searchbox from './Serachbox/Searchbox';
import ConversationList from './ConversationList/ConversationList';
import FakeConversations from './FakeConversations';
import EmptyItem from './EmptyItem';

interface IConversationsProps {
	oponentId?: string;
}

const Conversations: React.SFC<IConversationsProps> = ({ oponentId }) => {
	return (
		<Query query={GET_CHAT_FILTER} >
			{({ data: { chat: { inboxFilter } } }) => {
				return (
					<div id='conversations'>
						<Searchbox oponentId={oponentId} inboxFilter={inboxFilter} />
						<Query query={GET_CONV_ARR} >
							{({ loading, error, data }) => {
								if (error) return `Error! ${error.message}`;
								if (loading) return <FakeConversations />;

								const {
									userConversations: { conversationArr }
								}: IGetConvArrResponse = data;

								let filteredConv = [];
								switch (inboxFilter as TInboxFilter) {
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

								return <ConversationList oponentId={oponentId} conversationArr={filteredConv} />;
							}}
						</Query>
					</div>
				);
			}}
		</Query>
	);
};

export default Conversations;
