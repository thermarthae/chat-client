import { createStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export type TMessageInputStyles = WithStyles<typeof messageInputStyles>;

const messageInputStyles = ({ palette, typography }: Theme) => createStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: palette.background.default,
		flex: '0 0 auto',
		boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
		position: 'relative',

		'&> *': { marginRight: 5 },
		'& .public-DraftEditorPlaceholder-inner': {
			position: 'absolute',
			color: palette.text.disabled,
			pointerEvents: 'none',
		},
		'& .emoji-mart': {
			position: 'absolute',
			bottom: '100%',
			right: 20,
			zIndex: -1,
			borderWidth: '1px 1px 0px',
			borderRadius: '10px 10px 0px 0px',
			borderStyle: 'solid',
			borderColor: '#d9d9d9',
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
	btn: {
		fontSize: typography.emToPx(1.55),
		padding: typography.emToPx(0.715)
	},

});
export default messageInputStyles;