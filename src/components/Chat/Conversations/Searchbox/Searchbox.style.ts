import { createStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export type TSearchboxStyles = WithStyles<typeof searchboxStyles>;

const searchboxStyles = ({ palette, typography }: Theme) => createStyles({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexBasis: '70px',
		flexShrink: 0,
		position: 'relative',
		padding: '0 25px',
		// borderBottom: '1px $divider__color--light solid'
		borderBottom: '1px rgba(255, 255, 255, 0.12) solid'
	},
	searchbar: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		// color: $text - disabled__color--light
		color: palette.textLight.disabled,

		'&.filled.short $input': {
			boxShadow: 'inset 0 0 0px 1px #ff000080',
			'&:focus': {
				boxShadow: 'inset 0 0 0px 1px red',
			}
		},
		'&.filled$cancelBtn, &:focus-within $cancelBtn': {
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
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		transition: '0.2s',
		'&:placeholder': {
			color: 'rgba(255, 255, 255, 0.1)'
		},
		'&:focus': {
			backgroundColor: 'rgba(255, 255, 255, 0.2)',
			color: palette.textLight.primary
		}
	},
	progressBar: {
		position: 'absolute',
		height: 3,
		width: '100%',
		left: 0,
		bottom: -2,
		backgroundColor: palette.primary.dark
	}
});
export default searchboxStyles;
