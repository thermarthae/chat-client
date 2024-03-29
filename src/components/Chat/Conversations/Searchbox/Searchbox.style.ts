import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const searchboxStyles = makeStyles(({ palette, typography, shadows }: Theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: '0 0',
		position: 'relative',
		padding: '16px',
		boxShadow: '0px 1px hsla(0, 0%, 0%, 0.1)',
		zIndex: 1,
	},
	searchbar: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		color: palette.text.secondary,

		'&.filled, &:focus-within': {
			color: palette.text.primary,
		},
		'&.filled $cancelBtn, &:focus-within $cancelBtn': {
			pointerEvents: 'all',
			opacity: 1,
		}
	},
	glassIco: {
		userSelect: 'none',
		cursor: 'pointer',
		textDecoration: 'none',
		fontSize: 'inherit',
		position: 'absolute',
		pointerEvents: 'none',
		left: typography.emToPx(0.5),
	},
	cancelBtn: {
		pointerEvents: 'none',
		opacity: 0,
		position: 'absolute',
		color: 'inherit',
		padding: typography.emToPx(0.25),
		right: typography.emToPx(0.25),
		fontSize: 'inherit',
		transition: 'opacity 0.2s',
	},
	ico: {
		fontSize: 'inherit'
	},
	input: {
		padding: '6px ' + typography.emToPx(1.85),
		borderRadius: '1em',
		backgroundColor: palette.background.default,
		transition: '0.2s',
		boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1)',
		'&::placeholder': {
			color: palette.text.secondary,
			opacity: 1,
		},
		'&:focus': {
			backgroundColor: palette.background.default,
			boxShadow: shadows[3],
		}
	},
	progressBar: {
		position: 'absolute',
		height: 3,
		width: '100%',
		left: 0,
		bottom: -2,
		backgroundColor: 'rgba(0, 0, 0, 0.07)',
	}
}), { name: 'Searchbox' });

export default searchboxStyles;
