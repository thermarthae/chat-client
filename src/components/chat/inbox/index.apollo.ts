import gql from 'graphql-tag';

export const GET_CONVERSATION = gql`
	query ($id: ID!){
		getConversation(id: $id){
			name
			messages {
				_id
				author {
					name
				}
				time
				me
				content
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
}

export interface IGetConversationResponse {
	getConversation: {
		name: string;
		messages: [IMessage];
		draft: string;
	};
}
