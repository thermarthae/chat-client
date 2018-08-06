import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Query from 'react-apollo/Query';
import Mutation from 'react-apollo/Mutation';
import { SET_INBOX_FILTER, GET_CURRENT_USER, IGetCurrentUserResponse } from './index.apollo';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';

const NavLoading = () => {
	return <List className='container'>
		<ListItem button className={'line'}>
			<FormattedMessage id='chat.menu.inbox'>
				{txt => <span className='name'>{txt}</span>}
			</FormattedMessage>
			<CircularProgress size='1em' color='inherit' />
		</ListItem>
		<ListItem button className={'line'}>
			<FormattedMessage id='chat.menu.allMessages'>
				{txt => <span className='name'>{txt}</span>}
			</FormattedMessage>
			<CircularProgress size='1em' color='inherit' />
		</ListItem>
		<ListItem button className={'line'}>
			<FormattedMessage id='chat.menu.draft'>
				{txt => <span className='name'>{txt}</span>}
			</FormattedMessage>
			<CircularProgress size='1em' color='inherit' />
		</ListItem>
	</List>;
};

const NavFilters = () => {
	return <Query query={GET_CURRENT_USER}>
		{({ loading, error, data }) => {
			if (error) return `Error! ${error.message}`;
			if (loading) return <NavLoading />;

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

			return <Mutation mutation={SET_INBOX_FILTER}>
				{setInboxFilter =>
					<List className='container'>
						<ListItem
							button
							onClick={() => setInboxFilter({ variables: { inboxFilter: 'UNREAD' } })}
							className={'line' + (inboxFilter === 'UNREAD' ? ' active' : '')}
						>
							<FormattedMessage id='chat.menu.inbox'>
								{txt => <span className='name'>{txt}</span>}
							</FormattedMessage>
							<span className='count'>{unreadCount}</span>
						</ListItem>
						<ListItem
							button
							onClick={() => setInboxFilter({ variables: { inboxFilter: 'ALL' } })}
							className={'line' + (inboxFilter === 'ALL' ? ' active' : '')}
						>
							<FormattedMessage id='chat.menu.allMessages'>
								{txt => <span className='name'>{txt}</span>}
							</FormattedMessage>
							<span className='count'>{conversationCount}</span>
						</ListItem>
						<ListItem
							button
							onClick={() => setInboxFilter({ variables: { inboxFilter: 'DRAFT' } })}
							className={'line' + (inboxFilter === 'DRAFT' ? ' active' : '')}
						>
							<FormattedMessage id='chat.menu.draft'>
								{txt => <span className='name'>{txt}</span>}
							</FormattedMessage>
							<span className='count'>{draftCount}</span>
						</ListItem>
					</List>
				}
			</Mutation>;
		}}
	</Query>;
};

export default NavFilters;
