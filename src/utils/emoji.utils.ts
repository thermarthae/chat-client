import twemoji from 'twemoji';

const getImgRegex = /<img\s+[^>]*class="emoji"[^>]*>/g;

export const parseEmoji = (text: string) => {
	const withTwemoji = twemoji.parse(text, { folder: 'svg', ext: '.svg' });
	return withTwemoji.replace(getImgRegex, img => {
		const alt = img.match(/alt="(.*?)"/g);
		if (!alt) return '';
		const emoji = alt[0].split('"')[1];
		return !emoji ? '' : `<span class="emoji-wrapper">${img}<span>${emoji}</span></span>`;
	});
};
