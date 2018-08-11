import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Query from 'react-apollo/Query';

import '../../../style/users.component.scss';
import {
	GET_INBOX_FILTER,
	GET_CONVERSATION_LIST, IGetConversationListResponse,
	MESSAGES_SUBSCRIPTION, ILastMessage
} from './index.apollo';

import Searchbox from './searchbox.component';
import UserList from './UserList';

const FakeMessage = () => {
	return (
		<div className='fake'>
			<div className='content'>
				<div className='avatar'></div>
				<div className='clear'></div>
				<div className='center'>
					<div className='top'>
						<div className='clear'></div>
					</div>
					<div className='bottom'>
						<div className='clear'></div>
					</div>
				</div>
			</div>
		</div>

	);
};

const Users = () => {
	return (
		<div id='users'>
			<Searchbox />
			<Query query={GET_INBOX_FILTER}>{
				({ data: { chat: { inboxFilter } } }) =>
					<Query query={GET_CONVERSATION_LIST} variables={{ filter: inboxFilter }}>
						{({ loading, error, data, subscribeToMore }) => {
							if (error) return `Error! ${error.message}`;
							if (loading) return (
								<div className='list'>
									<FakeMessage />
									<FakeMessage />
									<FakeMessage />
									<div className='background' />
								</div>
							);

							const {
								userConversations: {
									conversationArr
								}
							}: IGetConversationListResponse = data;

							if (!conversationArr[0]) return (
								<div className='list empty'>
									<FormattedMessage id='chat.users.nothingToShow' />
								</div>
							);

							return <UserList
								conversationArr={conversationArr}
								subscribeToNewMessages={() => subscribeToMore({
									document: MESSAGES_SUBSCRIPTION,
									updateQuery: (prev: IGetConversationListResponse, { subscriptionData }) => {
										if (!subscriptionData.data) return prev;
										const prevConversationArr = prev.userConversations.conversationArr.slice();
										const messageAdded: ILastMessage = subscriptionData.data.newMessageAdded;

										let convIndex: number;
										const foundConversation = prevConversationArr.find((cnv, index) => {
											if (cnv._id !== messageAdded.conversation) return false;
											convIndex = index;
											return true;
										});

										if (foundConversation) {
											const editedConv = Object.assign({}, foundConversation, { lastMessage: messageAdded });
											prevConversationArr.splice(convIndex!, 1);
											prevConversationArr.splice(convIndex!, 0, editedConv);

											return Object.assign({}, prev, {
												userConversations: Object.assign({}, prev.userConversations, {
													conversationArr: prevConversationArr
												})
											});
										}
										// TODO: else add new convers
									}
								})}
							/>;
						}}
					</Query>
			}</Query>
		</div>
	);
};

export default Users;
