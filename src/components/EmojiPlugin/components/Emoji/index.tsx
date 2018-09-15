import * as React from 'react';
import twemoji from 'twemoji';

interface IEmoji {
	decoratedText: string;
	offsetKey: string;
}

const Emoji = ({ decoratedText, ...props }: IEmoji) => {
	const parsedHtml = twemoji.parse(decoratedText, { folder: 'svg', ext: '.svg' });
	const emojiUrl = parsedHtml.match(/https:\/\/twemoji(.*)\.svg/g)![0];

	return (
		<span className='emoji' style={{ backgroundImage: `url(${emojiUrl})` }}>
			<span data-offset-key={props.offsetKey}>
				<span data-text='true' >{decoratedText}</span>
			</span>
		</span>
	);

};

export default Emoji;
