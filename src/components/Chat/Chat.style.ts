import { makeStyles } from '@material-ui/styles';

const chatStyles = makeStyles({
	root: {
		display: 'flex',
		flexGrow: 1,
		zIndex: 0,
		overflow: 'hidden',
	}
}, { name: 'Chat' });

export default chatStyles;
