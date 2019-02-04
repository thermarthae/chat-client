import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const headerStyles = makeStyles(({ palette, typography }: Theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: '0 0 48px',
		fontSize: typography.emToPx(1.125),
		backgroundColor: palette.background.default,
		borderBottom: '1px solid hsla(0, 0%, 0%, 0.1)',
	},
	id: {
		flexGrow: 1,
		padding: '0 16px',
		fontWeight: 500,
	},
	btn: {
		height: 48,
		width: 48,
		fontSize: typography.emToPx(1.75),

		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.05)',
		},
	},
	ico: { fontSize: 'inherit' }
}), { name: 'Header' });
export default headerStyles;
