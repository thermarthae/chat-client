import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const scrollDownInfoStyles = makeStyles(({ palette, typography }: Theme) => {
	const em07 = typography.emToPx(0.7);
	return {
		root: {
			position: 'absolute',
			margin: 'auto',
			width: 'max-content',
			maxWidth: '50%',
			right: 0,
			left: 0,
			bottom: 0,
			padding: em07,
			borderRadius: `${em07} ${em07} 0px 0px`,
			color: palette.textLight.primary,
			cursor: 'pointer',
			textAlign: 'center',
			backgroundColor: palette.primary.light,
			boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
		},
	};
}, { name: 'ScrollDownInfo' });
export default scrollDownInfoStyles;
