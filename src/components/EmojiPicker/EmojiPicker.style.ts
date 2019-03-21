import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

import SearchIcon from './Icons/SearchOutline.svg';
import CancelIcon from './Icons/CancelOutline.svg';

interface IProps {
	emojiSize: number;
	emojiLargeSize: number;
}

const emojiPickerStyles = makeStyles(({ palette, typography, shadows }: Theme) => ({
	root: {
		// Picker return null when fetching data
		// TODO: when lazy loading/suspend support -> remove width and height
		//
		// width: emoji + padding * 7 emoji columns + emojiLarge + padding and border
		// height: emoji + padding * 8 rows; skinTones; search + paddings and margins + floored line height
		width: ((p: IProps) => (p.emojiSize + 16) * 7 + p.emojiLargeSize + 33) as any,
		height: ((p: IProps) => (p.emojiSize + 16) * 10 + 27 + Math.floor(typography.fontSize * 1.25)) as any,
		backgroundColor: palette.background.default,
		borderRadius: '4px 4px 0 0',
		boxShadow: shadows[2],
		overflow: 'hidden',
		color: palette.minorColors.paleSky,
		fontSize: typography.fontSize,
	},
	loading: {
		display: 'none',

		'&:only-child': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			width: '100%',
			height: '100%',
		}
	},
	picker: {
		display: 'grid',
		gridTemplateAreas: '"groups search" "groups emojis" "groups skinTones"',
		gridTemplateColumns: 'auto auto',
	},
	groups: {
		gridArea: 'groups',
		padding: '12px 16px',
		borderRight: `1px solid ${palette.divider}`,
	},
	groupsList: {
		display: 'flex',
		flexDirection: 'column',
		margin: 0,
		padding: 0,
		listStyle: 'none',
		justifyContent: 'space-between',
		height: '100%',
	},
	group: {
		backgroundColor: 'transparent',
		padding: 0,
		border: 0,
		lineHeight: 1.5,
		cursor: 'pointer',
		filter: 'grayscale(1)',
		opacity: 0.75,
		outline: 'none',
		userSelect: 'none',
		transition: 'filter .2s, opacity .2s',
		'&:hover': {
			filter: 'none',
			opacity: 1,
		}
	},
	groupActive: {
		filter: 'none',
		opacity: 1,
	},
	search: {
		gridArea: 'search',
		padding: 8,
		position: 'relative',

		//HACK: picker doesnt support custom adornments jet :(
		'&:after': {
			top: '50%',
			left: 16,
			width: typography.pxToRem(16),
			height: typography.pxToRem(16),
			content: '\"\"',
			position: 'absolute',
			pointerEvents: 'none',
			mask: `url(${SearchIcon}) no-repeat`,
			maskSize: 'cover',
			backgroundColor: palette.text.disabled,
			transform: 'translate(0%, -50%)',
		}

	},
	searchInput: {
		font: 'inherit',
		color: palette.text.primary,
		width: '100%',
		border: `1px solid ${palette.divider}`,
		margin: 0,
		padding: 4,
		paddingLeft: 12 + typography.fontSize,
		display: 'block',
		background: palette.background.paper,
		tapHighlightColor: 'transparent',
		borderRadius: '2em',
		outline: 'none',

		'&::placeholder': {
			color: palette.text.disabled,
			opacity: 1
		},

		'&::-webkit-search-decoration, &::-webkit-search-results-button, &::-webkit-search-results-decoration': {
			display: 'none',
		},

		//HACK: picker doesnt support custom adornments jet :(,
		'&::-webkit-search-cancel-button': {
			appearance: 'none',
			width: typography.fontSize,
			height: typography.fontSize,
			backgroundColor: palette.text.disabled,
			mask: `url(${CancelIcon})`,
			maskSize: 'cover',
		}
	},
	emojis: {
		gridArea: 'emojis',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column-reverse',
		backgroundColor: palette.background.paper
	},
	emojisList: {
		outline: 'none',
		'& > *': {
			marginTop: ((p: IProps) => (p.emojiSize + 16) * -1) as any
		}
	},
	emojisRow: {},
	emojisHeader: {
		padding: '0 16px',
		fontWeight: 'bold',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		boxShadow: `inset 0px -1px 0px  ${palette.divider}, inset 0px 1px 0px  ${palette.divider}`,
		backgroundColor: palette.background.default,
	},
	emojisHeaderSticky: {
		height: (({ emojiSize }: IProps) => emojiSize + 16) as any, //emoji + padding
	},
	clear: {
		color: 'inherit',
		cursor: 'pointer',
		display: 'contents',
	},
	emojisBody: {
		padding: '0 16px',
		height: '100%',
		display: 'grid',
		gridTemplateColumns: ((p: IProps) => `repeat(7, ${p.emojiSize}px)`) as any,
		justifyItems: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		alignContent: 'center',
	},
	emoji: {
		backgroundColor: 'transparent',
		border: 0,
		position: 'relative',
		zIndex: 1,
		cursor: 'pointer',
		outline: 'none',
		transition: 'transform .2s',
	},
	emojiActive: {
		transform: 'scale(1.5)'
	},
	skinTones: {
		gridArea: 'skinTones',
		borderTop: `1px solid ${palette.divider}`,
		padding: '8px 16px',
	},
	skinTonesList: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		margin: 0,
		padding: 0,

		'& > li': {
			display: 'contents',
		}
	},
	skinTone: {
		border: 0,
		borderRadius: 2,
		height: ((p: IProps) => p.emojiSize) as any,
		width: ((p: IProps) => p.emojiSize) as any,
		position: 'relative',
		marginLeft: 4,
		cursor: 'pointer',
		outline: 'none',
	},
	skinToneActive: {
		'&::after': {
			content: '"✓"',
			color: '#fff !important',
			textShadow: '1px 2px 1px rgba(0, 0, 0, 0.5)',
			display: 'block',
			position: 'absolute',
			fontSize: typography.pxToRem(12),
			bottom: 0,
			right: 2,
		}
	},
	noResults: {
		marginTop: 0,
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: 'bold',
		color: palette.action.selected,
		fontSize: '2em',
		padding: 16,
		userSelect: 'none',
		boxSizing: 'border-box',
	},
	noPreview: {},
	preview: {},
	previewEmoji: {},
	previewContent: {},
	previewTitle: {},
	previewSubtitle: {},
}), { name: 'EmojiPicker' });

export default emojiPickerStyles;
