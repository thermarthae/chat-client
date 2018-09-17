import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Query from 'react-apollo/Query';

import './Conversations.style.scss';
import { GET_CONVARR_AND_FILTER, IGetConvArrAndFilterResponse } from './Conversations.apollo';

import Searchbox from './Searchbox';
import UserList from './UserList/UserList';
import FakeConversations from './FakeConversations';

const Conversations = () => {
	return (
		<div id='conversations'>
			<Searchbox />
			<Query query={GET_CONVARR_AND_FILTER} >
				{({ loading, error, data }) => {
					if (error) return `Error! ${error.message}`;
					if (loading) return <FakeConversations />;

					const {
						chat: { inboxFilter },
						userConversations: { conversationArr }
					}: IGetConvArrAndFilterResponse = data;

					let filteredConv = [];
					switch (inboxFilter) {
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

					if (!filteredConv[0]) return (
						<div className='item--empty align--center list'>
							<FormattedMessage id='chat.conversations.nothingToShow' />
						</div>
					);

					return <UserList conversationArr={filteredConv} />;
				}}
			</Query>
		</div>
	);
};

export default Conversations;
