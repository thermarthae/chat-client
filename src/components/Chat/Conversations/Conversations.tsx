import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Query from 'react-apollo/Query';

import './Conversations.style.scss';
import { GET_CONVARR_AND_FILTER, IGetConvArrAndFilterResponse } from './Conversations.apollo';

import Searchbox from './Searchbox';
import UserList from './UserList/UserList';

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

const Conversations = () => {
	return (
		<div id='conversations'>
			<Searchbox />
			<Query query={GET_CONVARR_AND_FILTER} >
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
						chat: { inboxFilter },
						userConversations: { conversationArr }
					}: IGetConvArrAndFilterResponse = data;

					if (!conversationArr[0]) return (
						<div className='list empty'>
							<FormattedMessage id='chat.conversations.nothingToShow' />
						</div>
					);

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

					return <UserList conversationArr={filteredConv} />;
				}}
			</Query>
		</div>
	);
};

export default Conversations;
