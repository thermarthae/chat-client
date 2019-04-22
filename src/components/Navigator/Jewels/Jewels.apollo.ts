import gql from 'graphql-tag';

export const GET_CONV_SEEN = gql`
	query getConvSeen {
		getUserConversations {
			seen
		}
	}
`;
export interface IGetConvSeenRes {
	getUserConversations: Array<{
		seen: string;
	}>;
}
