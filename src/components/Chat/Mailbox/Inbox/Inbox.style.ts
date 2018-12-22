import { createStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export type TInboxStyles = WithStyles<typeof inboxStyles>;

const inboxStyles = ({ }: Theme) => createStyles({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		flexDirection: 'column',
		overflow: 'auto',
		flex: '1 0 1px',
		zIndex: -1,
		position: 'relative',
	},
	overflow: { overflow: 'auto' },
	groups: {
		padding: '10px 0',
	},
	fetching: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
		padding: '10px 0'
	},
	clear: {
		height: 1,
		marginTop: -1,
	},
});
export default inboxStyles;
