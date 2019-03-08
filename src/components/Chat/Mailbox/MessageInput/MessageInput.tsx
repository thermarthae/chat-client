import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import messageInputStyles from './MessageInput.style';

import MessageEditor from './MessageEditor';

import createEmojiPlugin from '@src/components/EmojiPlugin';
const emojiPlugin = createEmojiPlugin();
const { EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];

interface IMessageInputProps {
	draft: string;
}
const MessageInput = ({ draft }: IMessageInputProps) => {
	const [t] = useTranslation();
	const [emojiSelectI18N] = useState(() => ({
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
	}));

	const messageEditor = useRef<any | null>(null); //TODO: any
	const handleSendMessage = () => {
		messageEditor.current!.getWrappedInstance().sendMessage();
	};

	const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
	const handleEmojiPickerToggle = () => setEmojiPickerIsOpen(!emojiPickerIsOpen);
	const handleEmojiPickerClose = () => setEmojiPickerIsOpen(false);

	const classes = messageInputStyles();

	return (
		<ClickAwayListener onClickAway={handleEmojiPickerClose}>
			<div className={classes.root}>
				<MessageEditor
					className={classes.input}
					ref={messageEditor}
					plugins={plugins}
					draft={draft}
					placeholder={t('chat.mailbox.typeYourMessage')}
				/>
				<Slide direction='up' in={emojiPickerIsOpen} mountOnEnter unmountOnExit>
					<EmojiSelect
						custom={[]}
						emojiTooltip
						showPreview={false}
						i18n={emojiSelectI18N}
					/>
				</Slide>
				<IconButton className={classes.btn} onClick={handleEmojiPickerToggle}>
					<InsertEmoticon fontSize='inherit' />
				</IconButton>
				<IconButton className={classes.btn} onClick={handleSendMessage}>
					<Send fontSize='inherit' />
				</IconButton>
			</div>
		</ClickAwayListener>
	);
};

export default React.memo(MessageInput);
