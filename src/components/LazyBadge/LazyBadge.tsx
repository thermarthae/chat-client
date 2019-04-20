import React from 'react';

import Badge, { BadgeProps } from '@material-ui/core/Badge';

import lazyBadgeStyles from './LazyBadge.style';

interface ILazyBadgeProps extends BadgeProps {
	loading?: boolean;
}
const LazyBadge = ({ loading, ...props }: ILazyBadgeProps) => {
	const classes = lazyBadgeStyles();

	if (loading) return (
		<Badge
			{...props}
			classes={{
				badge: classes.root
			}}
			badgeContent={<div className={classes.loader} />}
		/>
	);

	return <Badge {...props} />;
};

export default LazyBadge;
