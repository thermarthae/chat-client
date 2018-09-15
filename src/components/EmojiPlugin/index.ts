import decorateComponentWithProps from 'decorate-component-with-props';
import { EditorState } from 'draft-js';
import { Picker, PickerProps } from 'emoji-mart';

import Emoji from './components/Emoji';
import emojiStrategy from './emojiStrategy';
import attachImmutableEntitiesToEmojis from './modifiers/attachImmutableEntitiesToEmojis';
import addEmoji from './modifiers/addEmoji';

import 'emoji-mart/css/emoji-mart.css';

interface IStore {
	getEditorState: (() => EditorState) | undefined;
	setEditorState: ((newEditorState: EditorState) => void) | undefined;
}

export default () => {
	const ariaProps = {
		ariaHasPopup: 'false',
		ariaExpanded: 'false',
		ariaOwneeID: undefined,
		ariaActiveDescendantID: undefined,
	};

	const store = {
		getEditorState: undefined,
		setEditorState: undefined
	} as IStore;

	const pickerProps = {
		onClick: (emoji: any) => {
			const newEditorState = addEmoji(store.getEditorState!(), emoji.native);
			store.setEditorState!(newEditorState);
		},
		set: 'twitter'
	};

	return {
		EmojiSelect: decorateComponentWithProps<PickerProps>(Picker, pickerProps as any),

		decorators: [{
			strategy: emojiStrategy,
			component: Emoji,
		}],

		getAccessibilityProps: () => ({
			role: 'combobox',
			ariaAutoComplete: 'list',
			ariaHasPopup: ariaProps.ariaHasPopup,
			ariaExpanded: ariaProps.ariaExpanded,
			ariaActiveDescendantID: ariaProps.ariaActiveDescendantID,
			ariaOwneeID: ariaProps.ariaOwneeID,
		}),

		initialize: ({ getEditorState, setEditorState }: IStore) => {
			store.getEditorState = getEditorState;
			store.setEditorState = setEditorState;
		},

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
		},
	};
};
