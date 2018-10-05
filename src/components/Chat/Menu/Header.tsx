import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';

export default class Header extends React.PureComponent {
	public render() {
		return (
			<div className='head header'>
				<FormattedMessage id='chat.menu.title'>
					{txt => <span className='title'>{txt}</span>}
				</FormattedMessage>
				<IconButton className='btn'>
					<PersonAdd style={{ fontSize: 'inherit' }} />
				</IconButton>
			</div>
		);
	}
}
