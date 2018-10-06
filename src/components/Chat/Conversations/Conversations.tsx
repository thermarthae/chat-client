import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Query from 'react-apollo/Query';

import './Conversations.style.scss';
import {
	GET_CHAT_FILTER, TInboxFilter,
	GET_CONV_ARR, IGetConvArrResponse,
	UPDATED_CONV_SUBSCRIPTION, IConversation
} from './Conversations.apollo';

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
							{({ loading, error, data, subscribeToMore }) => {
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

								return <ConversationList
									oponentId={oponentId}
									conversationArr={filteredConv}
									subscribe={() => subscribeToMore({
										document: UPDATED_CONV_SUBSCRIPTION,
										updateQuery: (prev: IGetConvArrResponse, { subscriptionData }) => {
											if (!subscriptionData.data) return prev;
											const prevConvArr = prev.userConversations.conversationArr.slice();
											const updatedConv: IConversation = subscriptionData.data.updatedConversation;

											let convIndex: number;
											const foundConversation = prevConvArr.find((cnv, index) => {
												if (cnv._id !== updatedConv._id) return false;
												convIndex = index;
												return true;
											});
											if (!foundConversation) return {
												userConversations: { conversationArr: [...prevConvArr, updatedConv] }
											};

											const editedConv = Object.assign({}, foundConversation, updatedConv);
											prevConvArr.splice(convIndex!, 1);
											prevConvArr.splice(convIndex!, 0, editedConv);

											return {
												userConversations: Object.assign({},
													prev.userConversations,
													{ conversationArr: prevConvArr }
												)
											};
										}
									})}
								/>;
							}}
						</Query>
					</div>
				);
			}}
		</Query>
	);
};

export default Conversations;
