import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import './Error.style.scss';

const Error = () => {
	return <div id='error'>
		<FormattedMessage id='error.404' />
	</div>;
};
export default Error;
