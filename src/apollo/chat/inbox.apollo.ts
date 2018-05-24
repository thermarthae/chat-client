import { gql } from "apollo-boost";

export const TOGGLE_ASIDE = gql`
	mutation {
		toggleAside @client
	}
`;

export const GET_ASIDE_STATUS = gql`
	query {
		chat {
			isAsideOpen @client
		}
	}
`;

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
export interface IGetConversationResponse {
	getConversation: {
		name: string;
		messages: [{
			_id: string;
			authorName: string;
			time: string;
			me: boolean;
			content: string;
		}]
		draft: {
			content: string;
			time: string;
		}
	};
}
