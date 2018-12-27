import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const errorStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '4em',
		width: '100%',
		background: palette.primary.light,
		padding: '5em',
		wordBreak: 'break-all',
	}
}), { name: 'Error' });
export default errorStyles;
