import gql from 'graphql-tag';

export const GET_CONV_SEEN = gql`
	query getConvSeen {
		getUserConversations {
			_id
			seen
		}
	}
`;
export interface IGetConvSeenRes {
	getUserConversations: Array<{
		_id: string;
		seen: string;
	}>;
}
