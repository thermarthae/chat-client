import { createStyles, WithStyles } from '@material-ui/styles';

export type TChatStyles = WithStyles<typeof chatStyles>;

const chatStyles = createStyles({
	root: {
		display: 'flex',
		flexGrow: 1,
		zIndex: 0,
		overflow: 'hidden',
	}
});
export default chatStyles;
