import { EditorState } from 'draft-js';

import Emoji from './components/Emoji';
import emojiStrategy from './emojiStrategy';
import attachImmutableEntitiesToEmojis from './modifiers/attachImmutableEntitiesToEmojis';

export { default as addEmoji } from './modifiers/addEmoji';

export default () => ({
	decorators: [{
		strategy: emojiStrategy,
		component: Emoji,
	}],

	getAccessibilityProps: () => ({
		role: 'combobox',
		ariaAutoComplete: 'list',
		ariaHasPopup: 'false',
		ariaExpanded: false,
		ariaActiveDescendantID: undefined,
		ariaOwneeID: undefined,
	}),

	onChange: (editorState: EditorState) => {
		let newEditorState = attachImmutableEntitiesToEmojis(editorState);

		if (!newEditorState.getCurrentContent().equals(editorState.getCurrentContent()))
			// Forcing the current selection ensures that it will be at it's right place.
			// This solves the issue where inserting an Emoji on OSX with Apple's Emoji
			// selector led to the right selection the data, but wrong position in
			// the contenteditable.
			newEditorState = EditorState.forceSelection(
				newEditorState,
				newEditorState.getSelection(),
			);
		return newEditorState;
	}
});
