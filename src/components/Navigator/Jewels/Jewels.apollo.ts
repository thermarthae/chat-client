import gql from 'graphql-tag';

export const UNREAD_COUNT = gql`
	query unreadCount {
		getChatJewels {
			unreadCount
		}
	}
`;
export interface IUnreadCount {
	getChatJewels: {
		unreadCount: number;
	};
}
