import { makeStyles } from '@material-ui/styles';

const convStyles = makeStyles({
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
}, { name: 'Conversations' });

export default convStyles;
