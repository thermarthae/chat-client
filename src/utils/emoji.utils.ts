import twemoji from 'twemoji';
import { makeStyles } from '@material-ui/styles';

const getImgRegex = /<img\s+[^>]*class="emoji"[^>]*>/g;

const emojiStyles = makeStyles({
	root: {
		cursor: 'text',
		'& span': {
			display: 'inline-block',
			width: 0,
			margin: '0 1.1em 0 -1.1em',
			opacity: 0,
			overflow: 'hidden',
			verticalAlign: 'bottom',
		},
		'& img.emoji': {
			height: '1em',
			width: '1em',
			padding: '0 1px',
			verticalAlign: 'middle',
		}
	},
}, { name: 'Emoji' });

export const parseEmoji = (text: string) => {
	const withTwemoji = twemoji.parse(text, { folder: 'svg', ext: '.svg' });
	const classes = emojiStyles({});

	return withTwemoji.replace(getImgRegex, img => {
		const alt = img.match(/alt="(.*?)"/g);
		if (!alt) return '';
		const emoji = alt[0].split('"')[1];
		return !emoji ? '' : `<span class="${classes.root}">${img}<span>${emoji}</span></span>`;
	});
};
