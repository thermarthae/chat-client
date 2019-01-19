import { createStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';


export type TAppStyles = WithStyles<typeof appStyles>;

const appStyles = ({ palette }: Theme) => createStyles({
	root: {
		display: 'flex',
		height: '100vh',
		color: palette.textLight.primary,
	},
});
export default appStyles;


