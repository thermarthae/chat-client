import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slide from '@material-ui/core/Slide';

import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { BaseEmoji } from 'emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index';


// import createEmojiPlugin from '@src/components/EmojiPlugin';
// const emojiPlugin = createEmojiPlugin();
// const { EmojiSelect } = emojiPlugin;


interface IEmojiPickerProps {
	isOpen: boolean;
	onSelect?: (emoji: BaseEmoji) => void;
}
const EmojiPicker = ({ isOpen, onSelect }: IEmojiPickerProps) => {
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



	return (
		<Slide direction='up' in={isOpen} mountOnEnter unmountOnExit>
			<Picker
				set='twitter'
				emojiTooltip
				showPreview={false}
				i18n={emojiSelectI18N}
				onSelect={onSelect}
			/>
		</Slide>
	);
};

export default React.memo(EmojiPicker);
