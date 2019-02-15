import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import errorStyles from './Error.style';

const Error = () => {
	const classes = errorStyles();
	const [t] = useTranslation();

	return (
		<Typography
			variant={'h2'}
			className={classes.root}
			inline
			children={t('error.404') + ' - ' + location.pathname}
		/>
	);
};
export default Error;
