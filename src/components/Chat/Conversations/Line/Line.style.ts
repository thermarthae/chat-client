import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { lighten } from 'polished';

const lineStyles = makeStyles(({ palette, typography }: Theme) => ({
	root: {
		padding: 16,
		alignItems: 'center',
		display: 'flex',
		cursor: 'pointer',
		position: 'relative',
		color: palette.text.primary,
		lineHeight: typography.emToPx(1.5),
		transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.5)',
		}
	},
	active: {
		backgroundColor: palette.background.default,
		boxShadow: 'inset 0 -1px hsla(0, 0%, 0%, 0.1), inset 0 1px hsla(0, 0%, 0%, 0.1)',
		'&:hover': {
			backgroundColor: lighten(0.05, palette.background.paper)
		},
		'*:first-child > &': {
			boxShadow: 'inset 0 -1px hsla(0, 0%, 0%, 0.1)',
			'&$unseen': {
				boxShadow: [`inset 3px 0 0 0 ${palette.minorColors.unseen}`, 'inset 0 -1px hsla(0, 0%, 0%, 0.1)'] as any
			}
		}
	},
	unseen: {
		boxShadow: `inset 3px 0 0 0 ${palette.minorColors.unseen}`,
		'& $convName': {
			fontWeight: typography.fontWeightMedium
		},
	},
	left: { flexShrink: 0 },
	avatar: { position: 'relative' },
	center: {
		display: 'flex',
		flexGrow: 1,
		flexShrink: 1,
		flexDirection: 'column',
		margin: '0 10px',
		overflow: 'hidden',
		whiteSpace: 'nowrap',

		'& > *': {
			textOverflow: 'ellipsis',
			overflow: 'hidden'
		}
	},
	convName: {},
	btn: {
		fontSize: typography.emToPx(1.5),
		padding: typography.emToPx(0.15),
		color: palette.text.disabled,
		'$root:hover &': {
			color: palette.text.primary
		},
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.05)'
		}
	},
	btnIcon: { fontSize: 'inherit' }
}), { name: 'Line' });
export default lineStyles;
