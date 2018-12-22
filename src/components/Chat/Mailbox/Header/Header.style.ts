import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const headerStyles = makeStyles(({ palette, typography }: Theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexBasis: 70,
		flexShrink: 0,
		fontSize: typography.emToPx(1.125),
		backgroundColor: palette.background.default,
		boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
		zIndex: 1,
	},
	id: {
		flexGrow: 1,
		padding: '0 25px',
		fontWeight: 500,
	},
	btn: {
		height: 70,
		width: 70,
		fontSize: typography.emToPx(1.75),

		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.05)',
		},
	},
	ico: { fontSize: 'inherit' }
}), { name: 'Header' });
export default headerStyles;
