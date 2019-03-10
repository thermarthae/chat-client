import Quill from 'quill';
import { IEmojiItem } from './emoji-list';
type TNode = any;

const Embed = Quill.import('blots/embed');

class EmojiBlot extends Embed {
	public static create(value: IEmojiItem) {
		const node = super.create();
		EmojiBlot.buildSpan(value, node);

		return node;
	}

	public static value(node: TNode) {
		return {
			name: node.dataset.name,
			native: node.native
		};
	}


	public static buildSpan(value: any, node: TNode) {
		console.log('value:', value);
		node.setAttribute('data-name', value.name);
		node.setAttribute('native', value.native);
		const emojiSpan = document.createElement('span');
		emojiSpan.classList.add(this.emojiClass);
		emojiSpan.classList.add(this.emojiPrefix + value.name);
		// unicode can be '1f1f5-1f1ea',see emoji-list.js.
		// emojiSpan.innerText = String.fromCodePoint(...EmojiBlot.parseUnicode(value.unicode));
		emojiSpan.innerText = value.native;
		node.appendChild(emojiSpan);
	}

	// public static parseUnicode(str: string) {
	// 	console.log('str:', str);
	// 	return str.split('-').map(s => parseInt(s, 16));
	// }
}

EmojiBlot.blotName = 'emoji';
EmojiBlot.className = 'ql-emojiblot';
EmojiBlot.tagName = 'span';
EmojiBlot.emojiClass = 'ap';
EmojiBlot.emojiPrefix = 'ap-';

export default EmojiBlot;
