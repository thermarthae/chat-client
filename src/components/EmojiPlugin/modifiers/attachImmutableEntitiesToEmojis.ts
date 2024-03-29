import { EditorState, Modifier, SelectionState } from 'draft-js';
import findWithRegex from 'find-with-regex';

import { re as unicodeRegex } from '../utils/emojiRegex';

/*
 * Attaches Immutable DraftJS Entities to the Emoji text.
 *
 * This is necessary as emojis consist of 2 characters (unicode). By making them
 * immutable the whole Emoji is removed when hitting backspace.
 */
export default function attachImmutableEntitiesToEmojis(editorState: EditorState): EditorState {
	const contentState = editorState.getCurrentContent();
	const blocks = contentState.getBlockMap();
	let newContentState = contentState;

	blocks.forEach((block: any) => {
		const plainText = block.getText();

		const addEntityToEmoji = (start: number, end: number) => {

			const existingEntityKey = block.getEntityAt(start);
			if (existingEntityKey) {
				// avoid manipulation in case the emoji already has an entity
				const entity = newContentState.getEntity(existingEntityKey);
				if (entity && (entity as any).get('type') === 'emoji') return;
			}

			const selection = SelectionState.createEmpty(block.getKey())
				.set('anchorOffset', start)
				.set('focusOffset', end) as SelectionState;
			const emojiText = plainText.substring(start, end);
			const contentStateWithEntity = newContentState.createEntity('emoji', 'IMMUTABLE', { emojiUnicode: emojiText });
			const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

			newContentState = Modifier.replaceText(
				newContentState,
				selection,
				emojiText,
				undefined,
				entityKey,
			);
		};

		findWithRegex(unicodeRegex, block, addEntityToEmoji);
	});

	if (!newContentState.equals(contentState)) return EditorState.push(
		editorState,
		newContentState,
		'convert-to-immutable-emojis' as any,
	);

	return editorState;
}
