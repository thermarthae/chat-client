import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import { withStyles } from '@material-ui/styles';
import messageInputStyles, { TMessageInputStyles } from './MessageInput.style';

import MessageEditor from './MessageEditor';

import createEmojiPlugin from 'Components/EmojiPlugin';
const emojiPlugin = createEmojiPlugin();
const { EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];

interface IMessageInputProps {
	draft: string;
}

interface IMessageInputState {
	emojiPickerIsOpen: boolean;
}

type TProps = IMessageInputProps & InjectedIntlProps & TMessageInputStyles;
class MessageInput extends React.PureComponent<TProps, IMessageInputState>{
	constructor(props: TProps) {
		super(props);
		const { intl: { formatMessage } } = this.props;
		this.emojiSelectI18N = {
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
		};
	}

	public state = {
		emojiPickerIsOpen: false
	};

	private emojiSelectI18N = {};
	private messageEditor = React.createRef<any>();

	private handleSendMessage = () => {
		this.messageEditor.current!.getWrappedInstance().sendMessage();
	}

	private handleEmojiPickerClose = () => this.setState({ emojiPickerIsOpen: false });

	private handleEmojiPickerToggle = () => {
		this.setState(prevState => ({ emojiPickerIsOpen: !prevState.emojiPickerIsOpen }));
	}

	public render() {
		const { draft, classes, intl: { formatMessage } } = this.props;
		const { emojiPickerIsOpen } = this.state;

		return (
			<ClickAwayListener onClickAway={this.handleEmojiPickerClose}>
				<div className={classes.root}>
					<MessageEditor
						className={classes.input}
						ref={this.messageEditor}
						plugins={plugins}
						draft={draft}
						placeholder={formatMessage({ id: 'chat.mailbox.typeYourMessage' })}
					/>
					<Slide direction='up' in={emojiPickerIsOpen} mountOnEnter unmountOnExit>
						<EmojiSelect
							custom={[]}
							emojiTooltip
							showPreview={false}
							i18n={this.emojiSelectI18N}
						/>
					</Slide>
					<IconButton className={classes.btn}
						onClick={this.handleEmojiPickerToggle}
					>
						<InsertEmoticon style={{ fontSize: 'inherit' }} />
					</IconButton>
					<IconButton className={classes.btn}
						onClick={this.handleSendMessage}
					>
						<Send style={{ fontSize: 'inherit' }} />
					</IconButton>
				</div>
			</ClickAwayListener>
		);
	}
}

export default withStyles(messageInputStyles, { name: 'MessageInput' })(injectIntl(MessageInput));
