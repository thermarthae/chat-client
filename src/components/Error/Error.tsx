import React from 'react';
import { FormattedMessage } from 'react-intl';

import errorStyles from './Error.style';

const Error = () => {
	const classes = errorStyles({});
	return <div className={classes.root}>
		<FormattedMessage id='error.404' />
	</div>;
};
export default Error;
