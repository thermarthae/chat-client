import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const lazyBadgeStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		display: 'contents',
	},
	loader: {
		width: 1,
		height: 1,
		borderRadius: '50%',
		right: 0,
		position: 'absolute',
		opacity: 1,
		animation: '$ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
		transformOrigin: 'center',
		backgroundColor: palette.error.main,

	},
	'@keyframes ripple': {
		'0%': {
			opacity: 0,
		},
		'40%': {
			opacity: 1,
		},
		'100%': {
			transform: 'scale(20)',
			opacity: 0,
		}
	}
}), { name: 'LazyBadge' });

export default lazyBadgeStyles;
