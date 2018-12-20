import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { rgba, lighten } from 'polished';

const menuItemStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '18px 32px',
		transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

		'&:hover': {
			color: palette.textLight.primary,
			backgroundColor: 'rgba(255, 255, 255, 0.05)',
		}
	},
	active: {
		backgroundColor: palette.secondary.main,
		color: rgba(palette.textLight.secondary, 0.85),
		boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12)',

		'&:hover': {
			color: palette.textLight.primary,
			backgroundColor: lighten(0.05, palette.secondary.main),
		}
	},
}), { name: 'MenuItem' });
export default menuItemStyles;
