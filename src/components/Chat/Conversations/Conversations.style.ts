import { Theme } from '@material-ui/core';
import { createStyles, WithStyles } from '@material-ui/styles';

export type TConvStyles = WithStyles<typeof convStyles>;

const convStyles = ({ palette }: Theme) => createStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: palette.primary.light,
		zIndex: 1,
	}
});
export default convStyles;
