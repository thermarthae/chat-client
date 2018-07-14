import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import '../style/error.component.scss';

const Error = () => {
	return <div id='error'>
		<FormattedMessage id='error404' />
	</div>;
};
export default Error;
