import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const headerStyles = makeStyles(({ typography }: Theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		flexBasis: 70,
		flexShrink: 0,
		padding: '0 25px 0 30px',
		fontSize: typography.emToPx(1.5),
	}
}), { name: 'Header' });
export default headerStyles;
