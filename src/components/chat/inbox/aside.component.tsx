import * as React from 'react';

import Query from 'react-apollo/Query';
import { GET_ASIDE_STATUS } from './aside.apollo';

const Aside: React.SFC<{}> = () => {
	return (
		<Query query={GET_ASIDE_STATUS}>
			{({ data: { chat: { isAsideOpen } } }) =>
				<div className={'aside' + (isAsideOpen ? ' active' : '')}></div>
			}
		</Query>
	);
};

export default Aside;
