import React from 'react';
import classnames from 'classnames';

import asideStyles from './Aside.style';

interface IAsideProps {
	open: boolean;
}
const Aside = ({ open }: IAsideProps) => {
	const classes = asideStyles();

	return (
		<div className={classnames(classes.root, { [classes.active]: open })} />
	);
};

export default Aside;
