import { createStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export type TNavigatorStyles = WithStyles<typeof navigatorStyles>;

const navigatorStyles = ({ palette }: Theme) => createStyles({
	root: {
		backgroundColor: palette.primary.dark,
		display: 'flex',
		flexDirection: 'column',
		boxShadow: 'inset -1px 0 rgba(0, 0, 0, 0.12)',
		zIndex: 1,
	},
	navLink: {
		position: 'relative',
		height: 70,
		width: 70,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		boxSizing: 'border-box',
		lineHeight: 0,
		fontSize: 25,
		userSelect: 'none',
		cursor: 'pointer',
		textDecoration: 'none',
	},
	btn: {
		color: palette.textLight.primary,
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.1)'
		}
	},
	active: {
		backgroundColor: palette.primary.main
	}
});
export default navigatorStyles;
