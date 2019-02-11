import React from 'react';
import { useTranslation } from 'react-i18next';

import errorStyles from './Error.style';

const Error = () => {
	const classes = errorStyles({});
	const [t] = useTranslation();

	return (
		<div className={classes.root}>{t('error.404') + ' - ' + location.pathname}</div>
	);
};
export default Error;
