import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
	query {
		getChatJewels {
			conversationCount
			draftCount
			unreadCount
		}
	}
`;

export interface IGetCurrentUserResponse {
	getChatJewels: {
		conversationCount: number;
		draftCount: number;
		unreadCount: number;
	};
}
