import Quill from 'quill';
import Fuse from 'fuse.js';
import emojiList from './emoji-list';

// const Delta = Quill.import('delta');
const Module = Quill.import('core/module');

class TextAreaEmoji extends Module {
	// private quill: Quill;

	constructor(quill: Quill) {
		super(quill);
		this.quill = quill;
		const container = document.createElement('div');
		container.classList.add('textarea-emoji-control');
		container.style.cursor = 'pointer';
		container.style.position = 'absolute';
		container.innerHTML = '😀';
		this.quill.container.appendChild(container);
		container.addEventListener('click', this.checkEmojiBoxExist.bind(this), false);
	}

	public checkEmojiBoxExist() {
		const elementExists = document.getElementById('textarea-emoji');
		if (elementExists) elementExists.remove();
		else {
			const elementEmojiArea = document.createElement('div');
			elementEmojiArea.id = 'textarea-emoji';
			this.quill.container.appendChild(elementEmojiArea);
			const tabToolbar = document.createElement('div');
			tabToolbar.id = 'tab-toolbar';
			elementEmojiArea.appendChild(tabToolbar);

			const emojiType = [
				{ type: 'p', name: 'people', content: '<div class="i-people"></div>' },
				{ type: 'n', name: 'nature', content: '<div class="i-nature"></div>' },
				{ type: 'd', name: 'food', content: '<div class="i-food"></div>' },
				{ type: 's', name: 'symbols', content: '<div class="i-symbols"></div>' },
				{ type: 'a', name: 'activity', content: '<div class="i-activity"></div>' },
				{ type: 't', name: 'travel', content: '<div class="i-travel"></div>' },
				{ type: 'o', name: 'objects', content: '<div class="i-objects"></div>' },
				{ type: 'f', name: 'flags', content: '<div class="i-flags"></div>' }
			];

			const tabElementHolder = document.createElement('ul');
			tabToolbar.appendChild(tabElementHolder);

			// if (document.getElementById('emoji-close-div') === null) {
			// 	const closeDiv = document.createElement('div');
			// 	closeDiv.id = 'emoji-close-div';
			// 	closeDiv.addEventListener('click', fn_close, false);
			// 	document.getElementsByTagName('body')[0].appendChild(closeDiv);
			// }
			// else document.getElementById('emoji-close-div')!.style.display = 'block';

			const panel = document.createElement('div');
			panel.id = 'tab-panel';
			elementEmojiArea.appendChild(panel);
			const innerQuill = this.quill;
			emojiType.map(eType => {
				const tabElement = document.createElement('li');
				tabElement.classList.add('emoji-tab');
				tabElement.classList.add('filter-' + eType.name);
				const tabValue = eType.content;
				tabElement.innerHTML = tabValue;
				tabElement.dataset.filter = eType.type;
				tabElementHolder.appendChild(tabElement);
				const emojiFilter = document.querySelector('.filter-' + eType.name);
				emojiFilter!.addEventListener('click', () => {
					const emojiContainer = document.getElementById('textarea-emoji');
					const tab = emojiContainer && emojiContainer.querySelector('.active');

					if (tab) tab.classList.remove('active');

					emojiFilter!.classList.toggle('active');

					while (panel.firstChild) panel.removeChild(panel.firstChild);

					const type = (emojiFilter! as any).dataset.filter;
					console.log('type:', type);
					fn_emojiElementsToPanel(type, panel, innerQuill);
				});
			});

			const windowHeight = window.innerHeight;
			const editorPos = this.quill.container.getBoundingClientRect().top;
			if (editorPos > windowHeight / 2) elementEmojiArea.style.top = '-250px';
			fn_emojiPanelInit(panel, this.quill);
		}
	}
}

function fn_close() {
	const elementEmojiPlate = document.getElementById('textarea-emoji');
	// document.getElementById('emoji-close-div')!.style.display = 'none';
	if (elementEmojiPlate) elementEmojiPlate.remove();
}

function fn_emojiPanelInit(panel: HTMLDivElement, quill: Quill) {
	fn_emojiElementsToPanel('p', panel, quill);
	document.querySelector('.filter-people')!.classList.add('active');
}

function fn_emojiElementsToPanel(type: string, panel: HTMLDivElement, quill: Quill) {
	const fuseOptions = {
		shouldSort: true,
		matchAllTokens: true,
		threshold: 0.3,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		minMatchCharLength: 3,
		keys: [
			'category'
		]
	};
	const fuse = new Fuse(emojiList, fuseOptions);
	const result = fuse.search(type);
	result.sort((a, b) => a.emoji_order - b.emoji_order);

	quill.focus();
	const range = quill.getSelection();

	result.map(emoji => {
		const span = document.createElement('span');
		const t = document.createTextNode(emoji.shortname);
		span.appendChild(t);
		span.classList.add('bem');
		span.classList.add('bem-' + emoji.name);
		span.classList.add('ap');
		span.classList.add('ap-' + emoji.name);
		const output = '' + emoji.code_decimal + '';
		span.innerHTML = output + ' ';
		panel.appendChild(span);

		const customButton = document.querySelector('.bem-' + emoji.name);
		if (customButton)
			customButton.addEventListener('click', () => {
				// quill.insertText(range.index, customButton.innerHTML);
				// quill.setSelection(range.index + customButton.innerHTML.length, 0);
				// range.index = range.index + customButton.innerHTML.length;
				quill.insertEmbed(range!.index, 'emoji', emoji, 'user');
				setTimeout(() => quill.setSelection(range!.index + 1, 0), 0);
				fn_close();
			});
	});
}

export default TextAreaEmoji;
