import twemoji from 'twemoji';

export const getImgRegex = /<img\s+[^>]*class="emoji"[^>]*>/g;
export const getAltRegex = /(?<=alt=")(.*?)(?=")/g;

export const parseEmoji = (text: string) => {
	const withTwemoji = twemoji.parse(text, { folder: 'svg', ext: '.svg' });
	return withTwemoji.replace(getImgRegex, img => {
		const emoji = String(img.match(getAltRegex)) || '';
		return `<span class="emoji-wrapper">${img}<span>${emoji}</span></span>`;
	});
};
