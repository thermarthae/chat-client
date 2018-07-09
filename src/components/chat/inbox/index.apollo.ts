import gql from 'graphql-tag';

export const GET_CONVERSATION = gql`
	query ($id: ID!){
		getConversation(id: $id){
			name
			messages {
				_id
				authorName
				time
				me
				content
			}
			draft {
				content
				time
			}
		}
	}
`;
export interface IMessage {
	_id: string;
	authorName: string;
	time: string;
	me: boolean;
	content: string;
}
export interface IDraft {
	content: string;
	time: string;
}
export interface IGetConversationResponse {
	getConversation: {
		name: string;
		messages: [IMessage];
		draft?: IDraft;
	};
}
