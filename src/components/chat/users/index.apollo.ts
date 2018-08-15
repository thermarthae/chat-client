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
export interface IConversation {
	_id: string;
	name: string | null;
	seen: boolean;
	lastMessage: {
		_id: string;
		content: string;
		time: string;
		me: boolean;
		conversation: string;
	};
}
export interface IGetConversationListResponse {
	userConversations: {
		conversationArr: [IConversation];
	};
}
