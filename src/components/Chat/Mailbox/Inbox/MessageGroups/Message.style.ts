import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const messageStyles = makeStyles(({ palette, typography }: Theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		color: palette.text.primary,
		margin: '1px 0',
		'&:hover $options': { opacity: 1 },
		'&:first-child $content': { borderRadius: '2em 2em 2em 0' },
	},
	me: {
		flexDirection: 'row-reverse',
		'& $content': {
			color: palette.textLight.primary,
			backgroundColor: palette.primary.light,
			borderRadius: '2em 0 0 2em'
		},
		'&:first-child $content': { borderRadius: '2em 2em 0 2em' }
	},
	wrapper: { margin: '0 5px' },
	content: {
		position: 'relative',
		backgroundColor: palette.background.paper,
		borderRadius: '0 2em 2em 0',
		padding: typography.emToPx(0.6) + ' ' + typography.emToPx(0.85),
		wordBreak: 'break-word',
		whiteSpace: 'pre-wrap',
		fontWeight: 300,
		boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'
	},
	options: {
		display: 'flex',
		alignItems: 'center',
		flexShrink: 0,
		opacity: 0,
		transition: 'opacity 0.1s',
		willChange: 'opacity'

	},
	btn: {
		padding: typography.emToPx(0.15),
		fontSize: typography.emToPx(1.5)
	},
	ico: { fontSize: 'inherit' },
	clear: {
		height: 1,
		marginYop: -1
	},
}), { name: 'Message' });
export default messageStyles;
