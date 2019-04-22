import { makeStyles } from '@material-ui/styles';

const lazyBadgeStyles = makeStyles({
	root: {
		animation: '$ripple 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
		transformOrigin: '100% 0%',
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(0) translate(50%, -50%)',
			opacity: 0,
		},
		'40%': {
			opacity: 1,
		},
		'100%': {
			transform: 'scale(1) translate(50%, -50%)',
			opacity: 0,
		}
	}
}, { name: 'LazyBadge' });

export default lazyBadgeStyles;
