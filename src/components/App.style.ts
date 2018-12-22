import { createStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';


export type TAppStyles = WithStyles<typeof appStyles>;

const appStyles = ({ palette }: Theme) => createStyles({
	root: {
		display: 'flex',
		height: '100vh',
		color: palette.textLight.primary,
		background: palette.primary.dark,
		fontFamily: 'Roboto, sans-serif',
		fontSize: 14,
		lineHeight: 1.25,
	},
});
export default appStyles;


