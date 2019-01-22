import { createStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { setLightness } from 'polished';

export type TMailboxStyles = WithStyles<typeof mailboxStyles>;

const mailboxStyles = ({ palette }: Theme) => createStyles({
	root: {
		flex: '12 0 auto',
		display: 'flex',
		flexDirection: 'column',
		color: palette.text.primary,
		backgroundColor: setLightness(0.95, palette.primary.light),
		minWidth: '20em',
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
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
		textAlign: 'center',
		fontWeight: 600,
		userSelect: 'none',
		padding: '0 10px',
		color: 'rgba(0, 0, 0, 0.1)',
		fontSize: '3em',
	},
});
export default mailboxStyles;


