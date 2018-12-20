import * as React from 'react';
import Mutation from 'react-apollo/Mutation';
import Query from 'react-apollo/Query';
import { SET_INBOX_FILTER, GET_INBOX_FILTER, IGetInboxFilterResponse, TInboxFilter } from './Menu.apollo';

import List from '@material-ui/core/List';

import './Menu.style.scss';

import Header from './Header/Header';
import ConvFilters from './ConvFilters/ConvFilters';
import MenuItem from './MenuItem';

const options = [
	{ name: 'HELP', l18nID: 'chat.menu.help' },
	{ name: 'SETTINGS', l18nID: 'chat.menu.settings' }
];

const Menu = React.memo(() => (
	<Mutation mutation={SET_INBOX_FILTER} ignoreResults>{
		setInboxFilter =>
			<Query<IGetInboxFilterResponse> query={GET_INBOX_FILTER}>{
				({ data }) => {
					const { chat: { inboxFilter } } = data!;
					const setFilter = (f: TInboxFilter) => setInboxFilter({
						variables: { inboxFilter: f }
					});

					return (
						<div id='menu'>
							<Header />
							<div className='wrapper'>
								<ConvFilters filter={inboxFilter} setFilter={setFilter} />
								<div className='separator' />
								<List className='container'>
									<MenuItem
										l18nID={'chat.menu.searchResult'}
										active={inboxFilter === 'SEARCH'}
										setInboxFilter={() => setFilter('SEARCH')}
									/>
									{options.map(o => <MenuItem key={o.name} l18nID={o.l18nID} />)}
								</List>
							</div>
						</div>
					);
				}
			}</Query>
	}</Mutation>
));
export default Menu;
