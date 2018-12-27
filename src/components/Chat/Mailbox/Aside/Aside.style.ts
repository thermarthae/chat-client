import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const asideStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		marginRight: -300,
		flex: '0 0 300px',
		backgroundColor: palette.primary.main,
		transition: 'margin-right 750ms cubic-bezier(0.23, 1, 0.32, 1)',
		willChange: 'margin-right',
	},
	active: {
		marginRight: 0,
	}
}), { name: 'Aside' });
export default asideStyles;
