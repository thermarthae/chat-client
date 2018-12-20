import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const Header = () => (
	<div className='head header'>
		<FormattedMessage id='chat.menu.title'>
			{txt => <span className='title'>{txt}</span>}
		</FormattedMessage>
	</div>
);
export default Header;
