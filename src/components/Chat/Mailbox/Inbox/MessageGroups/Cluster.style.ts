import { makeStyles } from '@material-ui/styles';

const clusterStyles = makeStyles({
	container: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	author: {
		marginRight: 16,
	},
	list: {
		maxWidth: '60%',
	},
	me: {
		'& $container': { flexDirection: 'row-reverse' },
	}
}, { name: 'Cluster' });
export default clusterStyles;
