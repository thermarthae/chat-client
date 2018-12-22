import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const clusterStyles = makeStyles(({ palette }: Theme) => ({
	time: {
		textAlign: 'center',
		color: palette.text.secondary,
		lineHeight: 2,
		fontWeight: 500,
		userSelect: 'none',
	},
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
}), { name: 'Cluster' });
export default clusterStyles;
