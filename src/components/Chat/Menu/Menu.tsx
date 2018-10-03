import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import './Menu.style.scss';

import Header from './Header';
import NavFilters from './NavFilters/NavFilters';

export default class Menu extends React.PureComponent {
	public render() {
		return <div id='menu'>
			<Header />
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
	}
}
