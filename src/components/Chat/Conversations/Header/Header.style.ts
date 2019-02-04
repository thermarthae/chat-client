import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const headerStyles = makeStyles(({ palette, typography }: Theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		flex: '0 0 48px',
		fontSize: typography.emToPx(1.5),
		backgroundColor: palette.background.default,
		color: palette.text.primary,
		justifyContent: 'center',
		borderBottom: '1px solid hsla(0, 0%, 0%, 0.1)',
	}
}), { name: 'Header' });
export default headerStyles;
