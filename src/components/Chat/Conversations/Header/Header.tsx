import React from 'react';
import { useTranslation } from 'react-i18next';

import headerStyles from './Header.style';

const Header = () => {
	const classes = headerStyles();
	const [t] = useTranslation();

	return (
		<div className={classes.root}>{t('chat.menu.title')}</div>
	);
};
export default Header;
