import { makeStyles } from '@material-ui/styles';

const emojiStyles = makeStyles({
	root: {
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		verticalAlign: 'middle',
		display: 'inline-block',
		overflow: 'hidden',
		maxWidth: '1.95ch',
		minWidth: '1em',
		maxHeight: '1em',
		lineHeight: 'inherit',
		color: 'transparent',
		margin: '0 1px',

		'& span': {
			display: 'inline-block',
			overflow: 'hidden',
			textIndent: '-100%',
		}
	},
}, { name: 'DraftEditor-Emoji' });
export default emojiStyles;
