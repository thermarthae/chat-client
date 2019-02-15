import { createStyles, WithStyles } from '@material-ui/styles';

export type TInboxStyles = WithStyles<typeof inboxStyles>;

const inboxStyles = createStyles({
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
		margin: '16px 0',
		padding: '0 16px',
	},
	fetching: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
		margin: 16
	}
});
export default inboxStyles;
