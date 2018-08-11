import gql from 'graphql-tag';

export const GET_INBOX_FILTER = gql`
	query {
		chat @client {
			inboxFilter
		}
	}
`;

export const GET_CONVERSATION_LIST = gql`
	query ($filter: conversationFilter){
		userConversations(filter: $filter) {
			conversationArr {
				_id
				name
				seen
				lastMessage {
					_id
					content
					time
					me
					conversation
				}
			}
		}
	}
`;
export interface ILastMessage {
	_id: string;
	content: string;
	time: string;
	me: boolean;
	conversation: string;
}
export interface IConversation {
	_id: string;
	name: string | null;
	seen: boolean;
	lastMessage: ILastMessage;
}
export interface IGetConversationListResponse {
	userConversations: {
		conversationArr: [IConversation];
	};
}



export const MESSAGES_SUBSCRIPTION = gql`
	subscription {
		newMessageAdded {
			_id
			time
			content
			me
			conversation
		}
	}
`;
