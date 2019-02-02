import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const navigatorStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		backgroundColor: palette.primary.light,
		boxShadow: 'none'
	},
	toolbar: {
		minHeight: 56
	},
	grow: {
		flexGrow: 1,
	}
}), { name: 'Navigator' });
export default navigatorStyles;
