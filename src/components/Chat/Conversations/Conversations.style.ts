import { Theme } from '@material-ui/core';
import { createStyles, WithStyles } from '@material-ui/styles';

export type TConvStyles = WithStyles<typeof convStyles>;

const convStyles = ({ palette }: Theme) => createStyles({
	root: {
		flex: '1 0 250px',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: palette.primary.lighter,
	}
});
export default convStyles;
