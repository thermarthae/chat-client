import React from 'react';
import clsx from 'clsx';

import asideStyles from './Aside.style';

interface IAsideProps {
	open: boolean;
}
const Aside = ({ open }: IAsideProps) => {
	const classes = asideStyles();

	return (
		<div className={clsx(classes.root, open && classes.active)} />
	);
};

export default Aside;
