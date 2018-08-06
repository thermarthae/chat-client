import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Query from 'react-apollo/Query';

import '../../../style/users.component.scss';
import {
	GET_INBOX_FILTER,
	GET_CONVERSATION_LIST, IGetConversationListResponse
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
						{({ loading, error, data }) => {
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

							return <UserList conversationArr={conversationArr} />;
						}}
					</Query>
			}</Query>
		</div>
	);
};

export default Users;
