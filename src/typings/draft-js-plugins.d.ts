/// <resources type="react" />
/// <resources type="draft-js" />


declare module "draft-js-plugins-editor" {
	export type PluginsEditorProps = Draft.EditorProps | {
		plugins?: any,
	}

	export default class PluginsEditor extends React.Component<PluginsEditorProps, Draft.EditorState> { }
	export function createEditorStateWithText(text: string): Draft.EditorState;
	export function composeDecorators(...func: any[]): (...args: any[]) => any;
}

declare module "draft-js-emoji-plugin" {
	function createEmojiPlugin(config?: object): any;
	export type EmojiSuggestions = any;
	export default createEmojiPlugin;
}
