import React from 'react';
import classNames from 'classnames';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cancel from '@material-ui/icons/CancelOutlined';
import { CanonicalEmoji } from 'interweave-emoji';
const Picker = React.lazy(() => import('interweave-emoji-picker'));

import emojiPickerStyles from './EmojiPicker.style';

const unsupportedEmojis = [
	'00A9',
	'00AE',
	'0023-FE0F-20E3',
	'002A-FE0F-20E3',
	'0030-FE0F-20E3',
	'0032-FE0F-20E3',
	'0031-FE0F-20E3',
	'0033-FE0F-20E3',
	'0035-FE0F-20E3',
	'0034-FE0F-20E3',
	'0036-FE0F-20E3',
	'0037-FE0F-20E3',
	'0038-FE0F-20E3',
	'0039-FE0F-20E3',
	'1F441-FE0F-200D-1F5E8-FE0F'
];

const emojiCDN = (hexcode: string) => `https://twemoji.maxcdn.com/2/svg/${hexcode.toLowerCase()}.svg`;
const EmojiImg = ({ hexcode, size }: { hexcode: string, size: number }) => (
	<img src={emojiCDN(hexcode)} width={size} height={size} />
);
const makeGroupIcons = (size: number) => ({
	commonlyUsed: <EmojiImg size={size} hexcode='1f552' />,
	smileysPeople: <EmojiImg size={size} hexcode='1f603' />,
	animalsNature: <EmojiImg size={size} hexcode='1f436' />,
	foodDrink: <EmojiImg size={size} hexcode='1f374' />,
	travelPlaces: <EmojiImg size={size} hexcode='1f698' />,
	activities: <EmojiImg size={size} hexcode='26bd' />,
	objects: <EmojiImg size={size} hexcode='1f4a1' />,
	symbols: <EmojiImg size={size} hexcode='2049' />,
	flags: <EmojiImg size={size} hexcode='1f6a9' />,
});
const roundToEven = (num: number) => 2 * Math.round(num / 2);

interface IEmojiPickerProps {
	onSelect: (emoji: CanonicalEmoji, event: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
}
const EmojiPicker = ({ onSelect, className }: IEmojiPickerProps) => {
	const { fontSize } = useTheme<Theme>().typography;
	const emojiSize = roundToEven(fontSize * 1.285);
	const emojiLargeSize = roundToEven(fontSize * 1.715);

	const classes = emojiPickerStyles({ emojiSize, emojiLargeSize });

	const groupIcons = makeGroupIcons(emojiLargeSize);

	return (
		<div className={classNames(classes.root, className)}>
			<div className={classes.loading}>
				<CircularProgress />
			</div>
			<React.Suspense fallback={null}>
				<Picker
					classNames={classes}
					disablePreview
					stickyGroupHeader
					emojiPath={emojiCDN}
					onSelectEmoji={onSelect}
					locale='pl' //TODO: current language + add messages
					groupIcons={groupIcons}
					commonMode='recently-used'
					clearIcon={<Cancel fontSize='inherit' />}
					blacklist={unsupportedEmojis}
					displayOrder={['groups', 'search', 'emojis', 'skin-tones']}
					columnCount={7}
					rowCount={8}
					emojiSize={emojiSize}
					emojiLargeSize={emojiSize}
					emojiPadding={0}
					virtual={{
						columnPadding: 8,
						rowPadding: 8,
					}}
				/>
			</React.Suspense>
		</div>
	);
};

export type EmojiData = CanonicalEmoji;
export default React.memo(EmojiPicker);
