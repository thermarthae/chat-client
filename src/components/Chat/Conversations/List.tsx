import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

const listStyles = makeStyles({
	root: {
		position: 'relative',
		flexGrow: 1,
		overflow: 'auto',
		'& > a': {
			textDecoration: 'none',
		}
	},
}, { name: 'List' });

type IDiv = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
const List = ({ children, className, ...others }: IDiv) => {
	const classes = listStyles({});
	return (
		<div {...others} className={classes.root}>
			{children}
		</div>
	);
};
export default List;
