import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Slide } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

import { useMutation } from 'react-apollo-hooks';
import { SEND_MESSAGE, ISendMessageRes } from './MessageInput.apollo';
import { ConvMailboxFragment, IConvMailboxFrag } from '../Mailbox.apollo';

import { EditorState, Modifier, ContentState } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createEmojiPlugin, { addEmoji } from '@src/components/EmojiPlugin';
const draftPlugins = [createEmojiPlugin()];

import messageInputStyles from './MessageInput.style';
import EmojiPicker, { EmojiData } from '@src/components/EmojiPicker/EmojiPicker';


interface IMessageInputProps {
	draft: string;
	oponentId: string;
}
const MessageInput = ({ draft, oponentId }: IMessageInputProps) => {
	const messageEditor = useRef<Editor | null>(null);

	const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
	const handleEmojiPickerToggle = () => setEmojiPickerIsOpen(!emojiPickerIsOpen);
	const handleEmojiPickerClose = () => setEmojiPickerIsOpen(false);

	const [draftjsState, setDraftjsState] = useState(() => createEditorStateWithText(draft));
	const onChange = (currentState: EditorState) => setDraftjsState(currentState);

	const handleOnEmojiSelect = (emoji: EmojiData) => {
		const newDraftjsState = addEmoji(draftjsState, emoji.unicode);
		setDraftjsState(newDraftjsState);
	};

	const sendMsgMutation = useMutation<ISendMessageRes>(SEND_MESSAGE);
	const handleSendMessage = async () => {
		const message = draftjsState.getCurrentContent().getPlainText();
		if (!message) return;

		const stateBackup = draftjsState;
		const clearedState = EditorState.push(draftjsState, ContentState.createFromText(''), 'remove-range');
		setDraftjsState(clearedState);

		sendMsgMutation({
			variables: { conversationId: oponentId, message },
			update: (proxy, { data }) => {
				const options = {
					id: oponentId,
					fragment: ConvMailboxFragment,
					fragmentName: 'ConversationMailbox'
				};
				const { sendMessage } = data!;
				const { messages, ...rest } = proxy.readFragment<IConvMailboxFrag>(options)!;

				const msgExists = messages.find(msg => msg._id === sendMessage._id);
				if (msgExists) return;

				proxy.writeFragment({
					...options,
					data: {
						...rest,
						messages: [...messages, sendMessage]
					}
				});
			},
			optimisticResponse: {
				__typename: 'Mutation',
				sendMessage: {
					__typename: 'Message',
					_id: Date.now(),
					me: true,
					author: {
						__typename: 'User',
						name: ''
					},
					content: message,
					conversation: oponentId,
					time: new Date().toISOString()
				}
			}
		}).catch(() => setDraftjsState(stateBackup));
	};

	const focusEditor = () => (messageEditor.current! as any).focus();

	const handleReturn = (event: React.KeyboardEvent) => {
		if (!event.shiftKey) {
			event.preventDefault();
			handleSendMessage();
			return 'handled';
		}
	};
	const handlePastedText = (text: string, { }, state: EditorState) => {
		const newState = Modifier.replaceText(
			state.getCurrentContent(),
			state.getSelection(),
			text.trim()
		);
		setDraftjsState(EditorState.push(state, newState, 'insert-fragment'));
		return 'handled';
	};

	const classes = messageInputStyles();
	const [t] = useTranslation();

	return (
		<ClickAwayListener onClickAway={handleEmojiPickerClose}>
			<div className={classes.root}>
				<div className={classes.input} onClick={focusEditor}>
					<Editor
						editorState={draftjsState}
						onChange={onChange}
						plugins={draftPlugins}
						ref={messageEditor}
						placeholder={t('chat.mailbox.typeYourMessage')}
						handleReturn={handleReturn}
						handlePastedText={handlePastedText}
					/>
				</div>
				<Slide direction='up' in={emojiPickerIsOpen} mountOnEnter unmountOnExit>
					<EmojiPicker className={classes.emojiPicker} onSelect={handleOnEmojiSelect} />
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
