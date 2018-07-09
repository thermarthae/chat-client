import gql from 'graphql-tag';

export const GET_INBOX_FILTER = gql`
	query {
		chat @client {
			inboxFilter
		}
	}
`;
// export interface IGetInboxFilterResponse {
// 	chat: {
// 		inboxFilter: 'unread' | null | 'draft'
// 	};
// }


export const GET_CONVERSATION_LIST = gql`
	query ($filter: conversationFilter){
		currentUser {
			conversationData(filter: $filter) {
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
	currentUser: {
		conversationData: {
			conversationArr: [IConversation];
		}
	};
}
