import * as React from 'react';

import Query from 'react-apollo/Query';
import Mutation from 'react-apollo/Mutation';
import { SET_INBOX_FILTER, GET_CURRENT_USER, IGetCurrentUserResponse } from './NavFilters.apollo';

import List from '@material-ui/core/List';

import NavItem from './NavItem';

const NavFilters = () => {
	const emptyInboxFilters = [
		{ name: 'UNREAD', l18nID: 'chat.menu.inbox' },
		{ name: 'ALL', l18nID: 'chat.menu.allMessages' },
		{ name: 'DRAFT', l18nID: 'chat.menu.draft' }
	];

	return (
		<List className='container'>
			<Query query={GET_CURRENT_USER}>
				{({ loading, error, data }) => {
					if (error) return `Error! ${error.message}`;
					if (loading) return emptyInboxFilters.map(
						filter => <NavItem key={filter.name} l18nID={filter.l18nID} />
					);

					const {
						userConversations: {
							conversationCount,
							draftCount,
							unreadCount
						},
						chat: {
							inboxFilter
						}
					}: IGetCurrentUserResponse = data;

					const inboxFilters = [
						{ name: 'UNREAD', l18nID: 'chat.menu.inbox', count: unreadCount },
						{ name: 'ALL', l18nID: 'chat.menu.allMessages', count: conversationCount },
						{ name: 'DRAFT', l18nID: 'chat.menu.draft', count: draftCount }
					];

					return <Mutation mutation={SET_INBOX_FILTER} ignoreResults>
						{setInboxFilter => inboxFilters.map(filter =>
							<NavItem
								key={filter.name}
								active={inboxFilter === filter.name}
								count={filter.count}
								setInboxFilter={() => setInboxFilter({ variables: { inboxFilter: filter.name } })}
								l18nID={filter.l18nID}
							/>)
						}
					</Mutation>;
				}}
			</Query>
		</List>
	);
};

export default NavFilters;
