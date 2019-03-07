import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const mailboxStyles = makeStyles(({ palette }: Theme) => ({
	root: {
		flex: '9 0 20em',
		display: 'flex',
		flexDirection: 'column',
		color: palette.text.primary,
	},
	content: {
		flexGrow: 1,
		display: 'flex'
	},
	main: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		zIndex: 0,
	},
	empty: {
		color: palette.action.selected,
		margin: 'auto',
		padding: 16,
		userSelect: 'none'
	},
}), { name: 'Mailbox' });

export default mailboxStyles;
