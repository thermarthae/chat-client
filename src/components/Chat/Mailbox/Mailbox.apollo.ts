import gql from 'graphql-tag';

export const GET_CONVERSATION = gql`
	query ($id: ID!){
		getConversation(id: $id){
			_id
			name
			messages {
				_id
				author {
					name
				}
				time
				me
				content
				conversation
			}
			draft
		}
	}
`;
export interface IMessage {
	_id: string;
	author: {
		name: string;
	};
	time: string;
	me: boolean;
	content: string;
	conversation: string;
}
export interface IGetConversationResponse {
	getConversation: {
		_id: string;
		name: string;
		messages: IMessage[];
		draft: string;
	};
}
