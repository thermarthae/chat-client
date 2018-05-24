import { gql } from "apollo-boost";

export const SET_INBOX_FILTER = gql`
	mutation ($inboxFilter: String!){
		setInboxFilter(inboxFilter: $inboxFilter) @client
	}
`;

export const GET_CURRENT_USER = gql`
	query {
		currentUser {
			conversationData {
				conversationCount
				draftCount
				unreadCount
			}
		}
		chat @client {
			inboxFilter
		}
	}
`;
export interface IGetCurrentUserResponse {
	currentUser: {
		conversationData: {
			conversationCount: number;
			draftCount: number;
			unreadCount: number;
		}
	};
	chat: {
		inboxFilter: "UNREAD" | "ALL" | "DRAFT"
	};
}
