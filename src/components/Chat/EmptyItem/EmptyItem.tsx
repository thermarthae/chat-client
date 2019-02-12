import React from 'react';
import Typography from '@material-ui/core/Typography';
import emptyItemStyles from './EmptyItem.style';

interface IEmptyItem {
	msg: string;
}
const EmptyItem = ({ msg }: IEmptyItem) => {
	const classes = emptyItemStyles();

	return (
		<Typography
			className={classes.root}
			variant='h4'
			align='center'
			children={msg}
		/>
	);
};

export default EmptyItem;
