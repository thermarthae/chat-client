import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const appStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		flexDirection: 'column',
		display: 'flex',
		width: '100vw',
		height: '100vh',
		color: palette.text.primary,
		backgroundColor: palette.primary.lighter
	}
}), { name: 'App' });

export default appStyles;
