import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import { withStyles } from '@material-ui/styles';
import messageInputStyles, { TMessageInputStyles } from './MessageInput.style';

import MessageEditor from './MessageEditor';

import createEmojiPlugin from '@src/components/EmojiPlugin';
const emojiPlugin = createEmojiPlugin();
const { EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];

interface IMessageInputProps {
	draft: string;
}

interface IMessageInputState {
	emojiPickerIsOpen: boolean;
}

type TProps = IMessageInputProps & WithTranslation & TMessageInputStyles;
class MessageInput extends React.PureComponent<TProps, IMessageInputState>{
	constructor(props: TProps) {
		super(props);
		const { t } = this.props;
		this.emojiSelectI18N = {
			search: t('emojiPicker.search'),
			notfound: t('emojiPicker.notfound'),
			categories: {
				search: t('emojiPicker.categories.search'),
				recent: t('emojiPicker.categories.recent'),
				people: t('emojiPicker.categories.people'),
				nature: t('emojiPicker.categories.nature'),
				foods: t('emojiPicker.categories.foods'),
				activity: t('emojiPicker.categories.activity'),
				places: t('emojiPicker.categories.places'),
				objects: t('emojiPicker.categories.objects'),
				symbols: t('emojiPicker.categories.symbols'),
				flags: t('emojiPicker.categories.flags'),
				custom: t('emojiPicker.categories.custom'),
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
		const { draft, classes, t } = this.props;
		const { emojiPickerIsOpen } = this.state;

		return (
			<ClickAwayListener onClickAway={this.handleEmojiPickerClose}>
				<div className={classes.root}>
					<MessageEditor
						className={classes.input}
						ref={this.messageEditor}
						plugins={plugins}
						draft={draft}
						placeholder={t('chat.mailbox.typeYourMessage')}
					/>
					<Slide direction='up' in={emojiPickerIsOpen} mountOnEnter unmountOnExit>
						<EmojiSelect
							custom={[]}
							emojiTooltip
							showPreview={false}
							i18n={this.emojiSelectI18N}
						/>
					</Slide>
					<IconButton className={classes.btn} onClick={this.handleEmojiPickerToggle}>
						<InsertEmoticon fontSize='inherit' />
					</IconButton>
					<IconButton className={classes.btn} onClick={this.handleSendMessage}>
						<Send fontSize='inherit' />
					</IconButton>
				</div>
			</ClickAwayListener>
		);
	}
}

export default withStyles(messageInputStyles, { name: 'MessageInput' })(withTranslation()(MessageInput));
