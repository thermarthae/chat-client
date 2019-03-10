import emojiList, { IEmojiItem } from './emoji-list';

interface IEmojiMap {
	[name: string]: IEmojiItem;
}
const emojiMap: IEmojiMap = {};

emojiList.forEach(emojiListObject => emojiMap[emojiListObject.name] = emojiListObject);

export default emojiMap;
