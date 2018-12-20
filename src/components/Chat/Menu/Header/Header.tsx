import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import headerStyles from './Header.style';

const Header = () => {
	const classes = headerStyles({});
	return (
		<div className={classes.root}>
			<FormattedMessage id='chat.menu.title' />
		</div>
	);
};
export default Header;
