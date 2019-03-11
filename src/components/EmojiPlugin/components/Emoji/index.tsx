import React from 'react';
import twemoji from 'twemoji';
import emojiStyles from './Emoji.style';

interface IEmoji {
	decoratedText: string;
	offsetKey: string;
}

const Emoji = ({ decoratedText, offsetKey }: IEmoji) => {
	const parsedHtml = twemoji.parse(decoratedText, { folder: 'svg', ext: '.svg' });
	const emojiUrl = parsedHtml.match(/https:\/\/twemoji(.*)\.svg/g);
	if (!emojiUrl) return <span data-offset-key={offsetKey} children={parsedHtml} />;

	const classes = emojiStyles();

	return (
		<span
			className={classes.root}
			data-offset-key={offsetKey}
			style={{ backgroundImage: `url(${emojiUrl[0]})` }}
		>
			<span data-offset-key={offsetKey}>
				<span data-text='true'>{decoratedText}</span>
			</span>
		</span>
	);

};

export default Emoji;
