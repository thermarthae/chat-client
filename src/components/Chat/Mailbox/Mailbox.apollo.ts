import gql from 'graphql-tag';

export const GET_CONVERSATION = gql`
	query($id: ID!, $skip: Int!, $limit: Int!) {
		getConversation(id: $id){
			_id
			name
			messages(skip: $skip, limit: $limit) {
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



export const NEW_MESSAGES_SUBSCRIPTION = gql`
	subscription($convId: ID!) {
		newMessageAdded(conversationId: $convId) {
			_id
			author {
				name
			}
			time
			me
			content
			conversation
		}
	}
`;

