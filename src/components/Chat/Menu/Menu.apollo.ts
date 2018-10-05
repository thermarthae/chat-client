import gql from 'graphql-tag';

export const SET_INBOX_FILTER = gql`
	mutation ($inboxFilter: String!){
		setInboxFilter(inboxFilter: $inboxFilter) @client
	}
`;

export const GET_INBOX_FILTER = gql`
	query {
		chat @client {
			inboxFilter
		}
	}
`;
export type TInboxFilter = 'UNREAD' | 'ALL' | 'DRAFT' | 'SEARCH';
export interface IGetInboxFilterResponse {
	chat: {
		inboxFilter: TInboxFilter
	};
}
