import { makeStyles } from '@material-ui/styles';

const tweTypoStyles = makeStyles({
	emoji: {
		height: '1em',
		width: '1em',
		padding: '0 .05em 0 .1em',
		verticalAlign: '-0.15em'
	},
	cursor: {
		cursor: 'text'
	},
}, { name: 'TweTypography' });

export default tweTypoStyles;
