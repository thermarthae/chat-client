import { makeStyles } from '@material-ui/styles';

const clusterStyles = makeStyles({
	container: {
		display: 'flex',
		alignItems: 'flex-end',
		padding: '0px 10px',
		margin: '10px 0',
	},
	author: {
		margin: '0 5px',
	},
	list: {
		margin: '0 5px',
		maxWidth: '60%',
	},
	me: {
		'& $container': { flexDirection: 'row-reverse' },
	}
}, { name: 'Cluster' });
export default clusterStyles;
