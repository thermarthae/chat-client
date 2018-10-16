import * as React from 'react';

import Query from 'react-apollo/Query';
import { GET_CURRENT_USER, IGetCurrentUserResponse } from './ConvFilters.apollo';
import { TInboxFilter } from '../Menu.apollo';

import List from '@material-ui/core/List';

import MenuItem from '../MenuItem';

interface IConvFiltersProps {
	filter: TInboxFilter;
	setFilter: (inboxFilter: TInboxFilter) => void;
}
const ConvFilters: React.SFC<IConvFiltersProps> = ({ filter, setFilter }) => {
	const emptyInboxFilters = [
		{ name: 'UNREAD', l18nID: 'chat.menu.inbox' },
		{ name: 'ALL', l18nID: 'chat.menu.allMessages' },
		{ name: 'DRAFT', l18nID: 'chat.menu.draft' }
	];

	return (
		<List className='container'>
			<Query<IGetCurrentUserResponse> query={GET_CURRENT_USER}>
				{({ loading, error, data }) => {
					if (error) return `Error! ${error.message}`;
					if (loading) return emptyInboxFilters.map(
						f => <MenuItem key={f.name} l18nID={f.l18nID} count={null} />
					);

					const {
						userConversations: {
							conversationCount,
							draftCount,
							unreadCount
						}
					} = data!;

					const inboxFilters = [
						{ name: 'UNREAD', l18nID: 'chat.menu.inbox', count: unreadCount },
						{ name: 'ALL', l18nID: 'chat.menu.allMessages', count: conversationCount },
						{ name: 'DRAFT', l18nID: 'chat.menu.draft', count: draftCount },
					];

					return inboxFilters.map(f =>
						<MenuItem
							key={f.name}
							l18nID={f.l18nID}
							active={filter === f.name}
							count={f.count}
							setInboxFilter={() => setFilter(f.name as any)}
						/>
					);
				}}
			</Query>
		</List>
	);
};

export default ConvFilters;
