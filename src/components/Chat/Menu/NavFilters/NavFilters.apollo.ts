import gql from 'graphql-tag';

export const SET_INBOX_FILTER = gql`
	mutation ($inboxFilter: String!){
		setInboxFilter(inboxFilter: $inboxFilter) @client
	}
`;

export const GET_CURRENT_USER = gql`
	query {
		userConversations {
			conversationCount
			draftCount
			unreadCount
		}
		chat @client {
			inboxFilter
		}
	}
`;
export type TInboxFilter = 'UNREAD' | 'ALL' | 'DRAFT';
export interface IGetCurrentUserResponse {
	userConversations: {
		conversationCount: number;
		draftCount: number;
		unreadCount: number;
	};
	chat: {
		inboxFilter: TInboxFilter
	};
}
