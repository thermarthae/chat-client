import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const headerStyles = makeStyles(({ typography }: Theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		flex: '0 0 48px',
		padding: '0 30px',
		fontSize: typography.emToPx(1.5),
	}
}), { name: 'Header' });
export default headerStyles;
