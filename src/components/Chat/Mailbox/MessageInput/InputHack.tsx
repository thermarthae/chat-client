import React, { useState, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import { Delta, Sources } from 'quill';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import 'quill-emoji/dist/quill-emoji';


import { EmojiBlot } from '@src/components/QuillEmoji';
Quill.register({
	'formats/emoji': EmojiBlot,
	// 'modules/emoji-textarea': TextAreaEmoji
});

import 'quill-emoji/dist/quill-emoji.css';
import EmojiPicker from './EmojiPicker';
import { ClickAwayListener } from '@material-ui/core';
import { BaseEmoji } from 'emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index';



const modules = {
	toolbar: null,
	// 'emoji-textarea': true,
};

interface IInputHackProps {
	text: string;
	setText: (text: string) => void;
	className?: string;
	btn?: string;
}
const InputHack = ({ className, btn }: IInputHackProps) => {
	const reactQuillRef = useRef<ReactQuill | null>(null);

	const [value, setValue] = useState('');

	const set = (content: string, { }: Delta, { }: Sources) => {
		setValue(content);

		const quill = reactQuillRef.current!.getEditor();
		console.log('quill.getText():', quill.getText());
		console.log('quill.getContents():', quill.getContents());
		console.log('toPlaintext():', toPlaintext(quill.getContents()));
	};

	const toPlaintext = (delta: any) => {
		const reduced = delta.reduce((text: any, op: any) => {
			if (!op.insert) throw new TypeError('only `insert` operations can be transformed!');
			if (typeof op.insert !== 'string') return op.insert.native.value;
			return text + op.insert;
		}, '');
		return reduced;
	};

	const handleEmojiSelect = (emoji: BaseEmoji) => {
		// const emoji = {
		// 	id: 'kissing',
		// 	name: 'Kissing Face',
		// 	colons: ':kissing:',
		// 	emoticons: [],
		// 	unified: '1f617',
		// 	skin: null,
		// 	native: '😗'
		// };
		const parsedEmoji = {
			name: emoji.id,
			unicode: emoji.unified,
			native: emoji.native
			// shortname: ':100:',
			// code_decimal: '&#128175;',
			// category: 's',
			// emoji_order: 2119
		};

		const quill = reactQuillRef.current!.getEditor();
		quill.focus();

		const range = quill.getSelection();
		quill.insertEmbed(range!.index, 'emoji', parsedEmoji, 'user');
		quill.setSelection(range!.index + 1, 0);


		// console.log('quill.getContents():', quill.getContents());
		// console.log('quill.getLeaf():', quill.getLeaf(0));
		console.log('quill.getText():', quill.getText());
	};

	const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
	const handleEmojiPickerToggle = () => setEmojiPickerIsOpen(!emojiPickerIsOpen);
	const handleEmojiPickerClose = () => setEmojiPickerIsOpen(false);

	return (
		<ClickAwayListener onClickAway={handleEmojiPickerClose}>
			<>
				<div className={className} >
					<ReactQuill
						theme='snow'
						value={value}
						onChange={set}
						modules={modules}
						placeholder='Type your message...'
						formats={['emoji']}
						ref={reactQuillRef}
					/>
				</div>
				<EmojiPicker
					isOpen={emojiPickerIsOpen}
					onSelect={handleEmojiSelect}
				/>
				<IconButton className={btn} onClick={handleEmojiPickerToggle}>
					<InsertEmoticon fontSize='inherit' />
				</IconButton>
			</>
		</ClickAwayListener>
	);
};

export default InputHack;
