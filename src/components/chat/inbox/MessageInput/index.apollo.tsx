import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
	mutation ($conversationId: ID!, $message: String!) {
		sendMessage(conversationId: $conversationId, message: $message){
			_id
			me
			author {
				name
			}
			content
			time
			conversation
		}
	}
`;

export const GET_MESSAGES = gql`
	query ($id: ID!){
		getConversation(id: $id){
			_id
			messages {
				_id
				author {
					name
				}
				time
				me
				content
			}
		}
	}
`;
export interface IGetMessagesResponse {
	getConversation: {
		_id: string;
		messages: [{
			_id: string;
			author: {
				name: string;
			};
			time: string;
			me: boolean;
			content: string;
		}];
	};
}
