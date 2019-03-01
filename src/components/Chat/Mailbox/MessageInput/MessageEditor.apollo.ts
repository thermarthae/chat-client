import gql from 'graphql-tag';

export const GET_OPONENT_ID = gql`
	query getOponentID2 {
		chat @client {
			oponentId
		}
	}
`;
export interface IGetOponentIdResponse {
	chat: {
		oponentId: string;
	};
}

export const SEND_MESSAGE = gql`
	mutation sendMessage($conversationId: ID!, $message: String!) {
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
	query getMessages($id: ID!) {
		getConversation(id: $id){
			_id
			messages(limit: 10, skip: 0) {
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
