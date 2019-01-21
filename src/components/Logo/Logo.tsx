import React from 'react';
import classNames from 'classnames';

import logoStyles from './Logo.style';
import logo from '@src/public/logo.png';

interface ILogo {
	size: number;
	className?: string;
}

const Logo = React.memo(({ size, className }: ILogo = { size: 4 }) => {
	const classes = logoStyles();

	const width = 21 * size;
	const height = 7 * size;

	return (
		<img
			className={classNames(classes.root, className)}
			src={logo}
			alt='Logo'
			width={width}
			height={height}
		/>
	);
});
export default Logo;

