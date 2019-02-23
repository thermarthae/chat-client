import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const mainPageStyles = makeStyles(({ palette, typography, breakpoints }: Theme) => ({
	root: {
		width: '100%',
		height: '100%',
		overflowY: 'auto',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',

		[breakpoints.down(768)]: {
			backgroundColor: palette.background.paper,
		},
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 32px',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 80,
		color: palette.background.paper,

		[breakpoints.down(768)]: {
			padding: '0 16px',
			color: palette.text.primary,
		},
	},
	center: {
		display: 'flex',
		alignItems: 'center',
		flex: '1 1',

		[breakpoints.down(768)]: {
			flexDirection: 'row-reverse',
		},
	},
	main: {
		display: 'flex',
		flex: '1 0 50%',
		flexDirection: 'column',
		padding: '80px 32px',
		boxSizing: 'border-box',
		alignItems: 'center',
		minWidth: 320,

		[breakpoints.down(500)]: {
			minWidth: 'initial',
		},
		[breakpoints.down(768)]: {
			padding: '80px 16px'
		},
	},
	title: {
		wordSpacing: '100vh',
		fontWeight: 400,
		paddingBottom: '0.2em',

		[breakpoints.down(768)]: {
			...typography.h4
		},
	},
	subtitle: {
		[breakpoints.down(768)]: {
			...typography.body1
		},
	},
	wrapper: {
		maxWidth: 432,
		[breakpoints.down(500)]: {
			maxWidth: 'initial',
		},
	},
	btns: {
		display: 'flex',
		marginTop: 32,
		justifyContent: 'space-between',

		[breakpoints.down(768)]: {
			flexDirection: 'column-reverse',
			'& > *:not(:last-child)': {
				marginTop: 16
			},
		},
	},
	aside: {
		display: 'flex',
		flex: '1 1 50%',
		justifyContent: 'center',
		backgroundColor: palette.primary.main,
		height: '100%',
		alignItems: 'center',
		padding: '80px 32px',
		boxSizing: 'border-box',
		overflow: 'hidden',

		[breakpoints.down(500)]: {
			display: 'none',
		},

		[breakpoints.down(768)]: {
			padding: '80px 16px',
			flex: '1 1 30%',
		},
	},
	img: {
		width: '25vw',
		height: 'initial',
		minWidth: 157.5,
		maxWidth: 210,
	},
}), { name: 'MainPage' });
export default mainPageStyles;
