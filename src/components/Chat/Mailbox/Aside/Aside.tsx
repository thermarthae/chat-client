import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import classnames from 'classnames';

import asideStyles from './Aside.style';

import { GET_ASIDE_STATUS, IGetAsideStatusRes } from './Aside.apollo';

const Aside = () => {
	const classes = asideStyles();
	const { chat: { isAsideOpen } } = useQuery<IGetAsideStatusRes>(GET_ASIDE_STATUS).data!;

	return (
		<div className={classnames(classes.root, { [classes.active]: isAsideOpen })} />
	);
};

export default Aside;
