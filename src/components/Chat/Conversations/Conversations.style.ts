import { Theme } from '@material-ui/core';
import { createStyles, WithStyles } from '@material-ui/styles';

export type TConvStyles = WithStyles<typeof convStyles>;

const convStyles = ({ palette }: Theme) => createStyles({
	root: {
		flex: '1 0 250px',
		display: 'flex',
		minWidth: 0
	},
	widthFix: {
		minWidth: 0,
		display: 'flex',
		flex: 1,
		borderRight: '1px solid hsla(0, 0%, 0%, 0.1)',
		flexDirection: 'column'
	}
});
export default convStyles;
