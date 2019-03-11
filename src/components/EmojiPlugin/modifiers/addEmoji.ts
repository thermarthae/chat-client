import { Modifier, EditorState } from 'draft-js';

const addEmoji = (editorState: EditorState, emoji: string) => {
	const contentState = editorState.getCurrentContent();
	const contentStateWithEntity = contentState.createEntity('emoji', 'IMMUTABLE', { emojiUnicode: emoji });
	const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
	const currentSelectionState = editorState.getSelection();

	let emojiAddedContent;
	let emojiEndPos = 0;
	let blockSize = 0;

	// in case text is selected it is removed and then the emoji is added
	const afterRemovalContentState = Modifier.removeRange(
		contentState,
		currentSelectionState,
		'backward'
	);

	// deciding on the position to insert emoji
	const targetSelection = afterRemovalContentState.getSelectionAfter();

	emojiAddedContent = Modifier.insertText(
		afterRemovalContentState,
		targetSelection,
		emoji,
		undefined,
		entityKey,
	);

	emojiEndPos = targetSelection.getAnchorOffset();
	const blockKey = targetSelection.getAnchorKey();
	blockSize = contentState.getBlockForKey(blockKey).getLength();


	// If the emoji is inserted at the end, a space is appended right after for
	// a smooth writing experience.
	if (emojiEndPos === blockSize)
		emojiAddedContent = Modifier.insertText(
			emojiAddedContent,
			emojiAddedContent.getSelectionAfter(),
			' '
		);

	const newEditorState = EditorState.push(
		editorState,
		emojiAddedContent,
		'insert-emoji' as any
	);
	return EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter());
};

export default addEmoji;
