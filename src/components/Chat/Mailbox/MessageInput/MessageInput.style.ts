import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const messageInputStyles = makeStyles(({ palette, typography }: Theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: palette.background.default,
		flex: '0 0 auto',
		borderTop: '1px solid hsla(0, 0%, 0%, 0.1)',
		position: 'relative',

		'&> *': { marginRight: 5 },
		'& .public-DraftEditorPlaceholder-inner': {
			position: 'absolute',
			color: palette.text.disabled,
			pointerEvents: 'none',
		}
	},
	input: {
		flexGrow: 1,
		maxHeight: '10em',
		padding: 15,
		wordBreak: 'break-word',
		boxSizing: 'border-box',
		outline: 'none',
		cursor: 'text',
		overflowY: 'auto',
	},
	emojiPicker: {
		position: 'absolute',
		bottom: '100%',
		right: typography.pxToRem(22 + 2 * 10 + 10), //icon width + 2 * icon padding + 2 margins
		zIndex: -1,
		margin: 0,
	},
	btn: {
		fontSize: typography.emToPx(1.55),
		padding: typography.emToPx(0.715)
	},
}), { name: 'MessageInput' });

export default messageInputStyles;
