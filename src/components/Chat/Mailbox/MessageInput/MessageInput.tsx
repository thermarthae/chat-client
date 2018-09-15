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
					custom={[]}
					emojiTooltip
					showPreview={false}
					i18n={{
						search: formatMessage({ id: 'emojiPicker.search' }),
						notfound: formatMessage({ id: 'emojiPicker.notfound' }),
						categories: {
							search: formatMessage({ id: 'emojiPicker.categories.search' }),
							recent: formatMessage({ id: 'emojiPicker.categories.recent' }),
							people: formatMessage({ id: 'emojiPicker.categories.people' }),
							nature: formatMessage({ id: 'emojiPicker.categories.nature' }),
							foods: formatMessage({ id: 'emojiPicker.categories.foods' }),
							activity: formatMessage({ id: 'emojiPicker.categories.activity' }),
							places: formatMessage({ id: 'emojiPicker.categories.places' }),
							objects: formatMessage({ id: 'emojiPicker.categories.objects' }),
							symbols: formatMessage({ id: 'emojiPicker.categories.symbols' }),
							flags: formatMessage({ id: 'emojiPicker.categories.flags' }),
							custom: formatMessage({ id: 'emojiPicker.categories.custom' }),
						}
					}}
				/>}
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
