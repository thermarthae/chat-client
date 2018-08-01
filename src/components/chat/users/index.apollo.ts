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
					content
					time
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
		content: string;
		time: string;
	};
}
export interface IGetConversationListResponse {
	userConversations: {
		conversationArr: [IConversation];
	};
}
