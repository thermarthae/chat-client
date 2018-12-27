import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const fakeConvStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		padding: 20,
	},
	content: {
		position: 'relative',
		display: 'flex',
		padding: 0,
		background: `linear-gradient(-45deg, ${palette.secondary.light}, ${palette.secondary.dark})`,
		backgroundSize: '400%',
		animation: 'GradientLoading 5s infinite'
	},
	'@keyframes GradientLoading': {
		'0%': {
			backgroundPosition: '0 50%',
		},
		'50%': {
			backgroundPosition: '100% 50%',
		},
		'100%': {
			backgroundPosition: '0 50%',
		},
	},
	avatar: {
		width: 40,
		height: 40,
		position: 'relative',
		margin: '0 -16px -16px 0',
		top: -8,
		left: -8,
		border: `8px solid ${palette.primary.light}`,
		borderRadius: '50%'
	},
	avatarClear: {
		width: 10,
		height: 40,
		background: palette.primary.light
	},
	center: {
		flexGrow: 1
	},
	top: {
		height: 20,
		flexGrow: 1,
		position: 'relative',
		marginBottom: 3,
		boxShadow: `0 3px 0 0 ${palette.primary.light}`,
	},
	topClear: {
		width: '25%',
		height: '100%',
		position: 'absolute',
		right: 0,
		background: palette.primary.light
	},
	bottom: {
		width: '100%',
		height: 17,
		position: 'relative'
	},
	bottomClear: {
		width: '50%',
		height: '100%',
		position: 'absolute',
		right: 0,
		background: palette.primary.light
	}
}), { name: 'FakeConversation' });
export default fakeConvStyles;
