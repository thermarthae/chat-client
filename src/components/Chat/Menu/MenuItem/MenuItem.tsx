import React from 'react';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListItem from '@material-ui/core/ListItem';
import menuItemStyles from './MenuItem.style';

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
			countElement = <span>{count}</span>;
			break;
		case 'object': //if null
			countElement = <CircularProgress size='1em' color='inherit' />;
			break;
	}
	const classes = menuItemStyles({});

	return (
		<ListItem
			button
			onClick={setInboxFilter}
			className={classes.root + (active ? (' ' + classes.active) : '')}
		>
			<FormattedMessage id={l18nID} />
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
