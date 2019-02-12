import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const emptyItemStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		color: palette.action.selected,
		margin: 'auto',
		padding: 16,
		userSelect: 'none'
	},
}), { name: 'EmptyItem' });

export default emptyItemStyles;
