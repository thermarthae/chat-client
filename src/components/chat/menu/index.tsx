import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import '../../../style/menu.component.scss';

import Head from './head.component';
import NavFilters from './NavFilters';

const Menu = () => {
	return <div id='menu'>
		<Head />
		<div className='wrapper'>
			<NavFilters />
			<div className='separator' />
			<List className='container'>
				<ListItem className='line' button>
					<FormattedMessage id='chat.menu.help'>
						{txt => <span className='name'>{txt}</span>}
					</FormattedMessage>
				</ListItem>
				<ListItem className='line' button>
					<FormattedMessage id='chat.menu.settings'>
						{txt => <span className='name'>{txt}</span>}
					</FormattedMessage>
				</ListItem>
			</List>
		</div>
	</div>;
};

export default Menu;
