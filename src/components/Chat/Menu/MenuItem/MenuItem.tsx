import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListItem from '@material-ui/core/ListItem';

interface IMenuItemProps {
	l18nID: string;
	setInboxFilter?: () => void;
	active?: boolean;
	count?: number | null;
}

const MenuItem = React.memo(({ setInboxFilter, active, l18nID, count }: IMenuItemProps) => {
	let countElement = null;
	switch (typeof count) {
		case 'number':
			countElement = <span className='count'>{count}</span>;
			break;
		case 'object': //if null
			countElement = <CircularProgress size='1em' color='inherit' />;
			break;
	}

	return (
		<ListItem button
			onClick={setInboxFilter}
			className={'line' + (active ? ' active' : '')}
		>
			<FormattedMessage id={l18nID}>
				{txt => <span className='name'>{txt}</span>}
			</FormattedMessage>
			{countElement}
		</ListItem>
	);
},
	(prevProps, nextProps) => {
		if (prevProps.active !== nextProps.active) return false;
		if (prevProps.count !== nextProps.count) return false;
		return true;
	}
);

export default MenuItem;
