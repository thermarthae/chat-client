import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
	query {
		userConversations {
			conversationCount
			draftCount
			unreadCount
		}
	}
`;

export interface IGetCurrentUserResponse {
	userConversations: {
		conversationCount: number;
		draftCount: number;
		unreadCount: number;
	};
}
