import { createStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { rgba } from 'polished';

export type TLoginStyles = WithStyles<typeof loginStyles>;

const loginStyles = ({ palette, typography }: Theme) => createStyles({
	root: {
		backgroundColor: palette.primary.main,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		color: palette.text.primary,
		width: 380,
	},
	title: {
		fontSize: typography.emToPx(1.75),
		margin: '10px 0 8px 0',
	},
	subtitle: {
		color: palette.text.secondary,
	},
	form: {
		margin: '16px 0',
		'&> *:not(:first-child)': {
			marginTop: 16,
		}
	},
	actions: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: rgba(palette.primary.light, 0.05)
	},
	btnWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	progress: {
		position: 'absolute',
	}
});
export default loginStyles;
