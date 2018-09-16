import * as React from 'react';
import twemoji from 'twemoji';

interface IEmoji {
	decoratedText: string;
	offsetKey: string;
}

const Emoji = ({ decoratedText, ...props }: IEmoji) => {
	let parsedHtml = twemoji.parse(decoratedText, { folder: 'svg', ext: '.svg' });
	parsedHtml += `<span data-text='true'>${decoratedText}</span>`;

	return (
		<span
			className='emoji-wrapper'
			data-offset-key={props.offsetKey}
			dangerouslySetInnerHTML={{ __html: parsedHtml }}
		/>
	);

};

export default Emoji;
