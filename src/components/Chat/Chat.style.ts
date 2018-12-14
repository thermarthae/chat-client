import { createStyles, WithStyles } from '@material-ui/styles';

export type TChatStyles = WithStyles<typeof chatStyles>;

const chatStyles = createStyles({
	root: {
		display: 'grid',
		gridTemplateColumns: 'minmax(200px, 0.8fr) minmax(250px, 1fr) 4fr',
		gridTemplateRows: '100vh',
		width: '100%',
		zIndex: 0,
		overflow: 'hidden'
	}
});
export default chatStyles;
