import React from 'react';

import Badge, { BadgeProps } from '@material-ui/core/Badge';

import lazyBadgeStyles from './LazyBadge.style';

interface ILazyBadgeProps extends BadgeProps {
	loading?: boolean;
}
const LazyBadge = ({ loading, ...props }: ILazyBadgeProps) => {
	const classes = lazyBadgeStyles();
	const lazyProps = !loading ? {} : {
		classes: {
			badge: classes.root
		},
		badgeContent: undefined
	};

	return <Badge {...props} {...lazyProps} />;
};

export default LazyBadge;
