import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const loginStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		backgroundColor: palette.primary.main,
		width: '100%',
		height: '100%',
		display: 'flex',
		overflowY: 'auto'
	},
	form: {
		margin: '0 auto',
		width: 400,
		display: 'flex',
		flexDirection: 'column',
		'&:before, &:after': {
			content: '""',
			flexGrow: 1,
			flexShrink: 0,
			flexBasis: 16
		}
	},
	container: {
		color: palette.text.primary,
		width: 400,
		padding: 36,
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		flexShrink: 0
	},

	logo: {
		alignSelf: 'center',
		marginBottom: 16,
	},
	textFields: {
		margin: '16px 0'
	},
	actions: {
		display: 'flex',
		flexWrap: 'wrap-reverse',
		justifyContent: 'space-between',
		marginTop: 8
	},
	btnWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	progress: {
		position: 'absolute',
	},
	'@media (max-width: 425px)': {
		root: {
			backgroundColor: palette.background.paper,
		},
		container: {
			width: '100%',
			borderRadius: 0,
			boxShadow: 'none'
		},
	},
	'@media (max-width: 375px)': {
		container: {
			padding: 16
		},
		actions: {
			flexDirection: 'column-reverse',
			alignItems: 'center',
			'&> *:not(:last-child)': {
				marginTop: 16,
			}
		},
	},
}), { name: 'Login' });
export default loginStyles;
