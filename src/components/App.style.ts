import { createStyles, WithStyles } from '@material-ui/styles';

export type TAppStyles = WithStyles<typeof appStyles>;

const appStyles = createStyles({
	root: {
		display: 'flex',
		height: '100vh',
	}
});
export default appStyles;


