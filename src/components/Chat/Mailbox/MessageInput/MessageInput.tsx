import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import createEmojiPlugin from 'draft-js-emoji-plugin';

import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

import TextEditor from './TextEditor';

const emojiPlugin = createEmojiPlugin({
	selectButtonContent: (
		<IconButton component='div' className='btn emoticon'>
			<InsertEmoticon style={{ fontSize: 'inherit' }} />
		</IconButton>
	)
});
const { EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];

interface IMessageInputProps {
	oponentId: string;
	draft: string;
}

const MessageInput: React.SFC<IMessageInputProps & InjectedIntlProps> = props => {
	const { oponentId, draft, intl: { formatMessage } } = props;
	const textEditor = React.createRef<any>();

	return (
		<div className='bottom'>
			<TextEditor
				ref={textEditor}
				plugins={plugins}
				oponentId={oponentId}
				draft={draft}
				className='input'
				placeholder={formatMessage({ id: 'chat.mailbox.typeYourMessage' })}
			/>
			<EmojiSelect />
			<IconButton
				className='btn send'
				onClick={() => textEditor.current!.getWrappedInstance().sendMessage()}
			>
				<Send style={{ fontSize: 'inherit' }} />
			</IconButton>
		</div>
	);
};

export default injectIntl(MessageInput);
