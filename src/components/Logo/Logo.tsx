import React from 'react';
import clsx from 'clsx';

import logoStyles from './Logo.style';
import logo from '@src/public/logo.png';

interface ILogo {
	size?: number;
	className?: string;
}

const Logo = React.memo((props: ILogo) => {
	const classes = logoStyles();
	const size = props.size || 4;

	const width = 21 * size;
	const height = 7 * size;

	return (
		<img
			className={clsx(classes.root, props.className)}
			src={logo}
			alt='Logo'
			width={width}
			height={height}
		/>
	);
});
export default Logo;

