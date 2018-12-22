import * as React from 'react';

import Query from 'react-apollo/Query';
import asideStyles from './Aside.style';

import { GET_ASIDE_STATUS } from './Aside.apollo';

const Aside = () => {
	const classes = asideStyles({});
	return (
		<Query query={GET_ASIDE_STATUS}>
			{({ data: { chat: { isAsideOpen } } }) =>
				<div className={classes.root + (isAsideOpen ? (' ' + classes.active) : '')}></div>
			}
		</Query>
	);
};

export default Aside;
