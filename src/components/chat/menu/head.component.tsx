import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';

const Head = () => {
	return (
		<div className='head'>
			<FormattedMessage id='chat.menu.title'>
				{txt => <span className='title'>{txt}</span>}
			</FormattedMessage>
			<IconButton className='btn'>
				<PersonAdd style={{ fontSize: 'inherit' }} />
			</IconButton>
		</div>
	);
};

export default Head;
