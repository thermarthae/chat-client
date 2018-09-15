import * as React from 'react';
import twemoji from 'twemoji';

interface IEmoji {
	decoratedText: string;
	offsetKey: string;
}

const Emoji = ({ decoratedText, ...props }: IEmoji) => {
	const emojiCode = twemoji.convert.toCodePoint(decoratedText);
	const emojiUrl = `https://twemoji.maxcdn.com/2/svg/${emojiCode}.svg`;

	return (
		<span className='emoji' style={{ backgroundImage: `url(${emojiUrl})` }}>
			<span data-offset-key={props.offsetKey}>
				<span data-text='true' >{decoratedText}</span>
			</span>
		</span>
	);

};

export default Emoji;
