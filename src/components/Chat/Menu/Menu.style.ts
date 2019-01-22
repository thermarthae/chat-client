import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const menuStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		flex: '0.8 0 200px',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: palette.primary.main
	},
	wrapper: {
		flexGrow: 1,
		overflow: 'auto',
	},
	separator: {
		margin: '16px 0',
		borderBottom: '1px rgba(255, 255, 255, 0.12) solid',
	},
	container: {
		paddingRight: 1,
		color: palette.textLight.secondary,
		fontWeight: 500,
	},
}), { name: 'Menu' });
export default menuStyles;
