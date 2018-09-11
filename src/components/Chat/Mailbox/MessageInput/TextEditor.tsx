import * as React from 'react';
import { SelectionState, Modifier, EditorState, ContentState } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

import withApollo, { WithApolloClient } from 'react-apollo/withApollo';
import {
	SEND_MESSAGE,
	GET_MESSAGES,
	IGetMessagesResponse,
} from './MessageInput.apollo';

import './TextEditor.style.scss';

interface ITextEditorProps {
	oponentId: string;
	draft: string;
	className?: string;
	plugins?: any;
	placeholder?: string;
}

interface ITextEditorStates {
	editorState: EditorState;
}

type TProps = WithApolloClient<ITextEditorProps>;
class TextEditor extends React.PureComponent<TProps, ITextEditorStates> {
	private editorRef = React.createRef<HTMLDivElement>();

	public state = {
		editorState: createEditorStateWithText(''),
	};

	private onChange = (editorState: any) => this.setState({ editorState });
	private focus = () => this.editorRef.current!.focus();

	private handleReturn = (event: React.KeyboardEvent) => {
		if (!event.shiftKey) {
			event.preventDefault();
			this.sendMessage();
			return 'handled';
		}
	}

	private clearEditorContent = (editorState: EditorState, contentState: ContentState) => {
		const firstBlock = contentState.getFirstBlock();
		const lastBlock = contentState.getLastBlock();
		const allSelected = new SelectionState({
			anchorKey: firstBlock.getKey(),
			anchorOffset: 0,
			focusKey: lastBlock.getKey(),
			focusOffset: lastBlock.getLength(),
			hasFocus: true,
		});
		contentState = Modifier.removeRange(contentState, allSelected, 'backward');
		editorState = EditorState.push(editorState, contentState, 'remove-range');
		editorState = EditorState.forceSelection(editorState, contentState.getSelectionAfter());

		this.setState({ editorState });
	}

	private sendMessage = async () => {
		const { oponentId, client } = this.props;
		const { editorState } = this.state;
		const contentState = editorState.getCurrentContent();
		const message = contentState.getPlainText();

		if (!message) return;

		try {
			this.clearEditorContent(editorState, contentState);
			await client.mutate({
				mutation: SEND_MESSAGE,
				variables: { conversationId: oponentId, message },
				update: (proxy, { data: { sendMessage } }: any) => {
					const data = proxy.readQuery(
						{ query: GET_MESSAGES, variables: { id: oponentId } }
					) as IGetMessagesResponse;
					const { messages } = data.getConversation;

					if (!messages.find(msg => msg._id === sendMessage._id)) messages.push(sendMessage);
					proxy.writeQuery({ query: GET_MESSAGES, data, variables: { id: oponentId } });
				},
				optimisticResponse: {
					__typename: 'Mutation',
					sendMessage: {
						__typename: 'Message',
						_id: Date.now(),
						me: true,
						author: {
							__typename: 'User',
							name: ''
						},
						content: message,
						conversation: oponentId,
						time: Date.now()
					}
				}
			});
		} catch (e) {
			this.setState({ editorState });
		}
	}

	public render() {
		const { className, plugins, placeholder } = this.props;

		return (
			<div className={className} onClick={this.focus} >
				<Editor
					editorState={this.state.editorState}
					onChange={this.onChange}
					handleReturn={this.handleReturn}
					plugins={plugins}
					ref={this.editorRef as any}
					placeholder={placeholder}
				/>
			</div>
		);
	}
}

export default withApollo(TextEditor, { withRef: true });
