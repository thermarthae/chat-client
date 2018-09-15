import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

import MessageEditor from './MessageEditor';

import createEmojiPlugin from 'Components/EmojiPlugin';
const emojiPlugin = createEmojiPlugin();
const { EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];

interface IMessageInputProps {
	oponentId: string;
	draft: string;
}

class MessageInput extends React.PureComponent<IMessageInputProps & InjectedIntlProps, { open: boolean }>{
	public state = {
		open: false
	};

	public render() {
		const { oponentId, draft, intl: { formatMessage } } = this.props;
		const messageEditor = React.createRef<any>();

		return (
			<div className='bottom'>
				<MessageEditor
					className='input'
					oponentId={oponentId}
					ref={messageEditor}
					plugins={plugins}
					draft={draft}
					placeholder={formatMessage({ id: 'chat.mailbox.typeYourMessage' })}
				/>
				{this.state.open && <EmojiSelect
					style={{ position: 'absolute', right: 10, bottom: 20 }}
					custom={[]}
				/> /* TODO: l18n */}
				<IconButton className='btn emoticon'
					onClick={() => this.setState(prevState => ({ open: !prevState.open }))}
				>
					<InsertEmoticon style={{ fontSize: 'inherit' }} />
				</IconButton>
				<IconButton className='btn send'
					onClick={() => messageEditor.current!.getWrappedInstance().sendMessage()}
				>
					<Send style={{ fontSize: 'inherit' }} />
				</IconButton>
			</div>
		);
	}
}

export default injectIntl(MessageInput);
