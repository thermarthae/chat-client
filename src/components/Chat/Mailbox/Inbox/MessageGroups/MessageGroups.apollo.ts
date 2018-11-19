import gql from 'graphql-tag';

export const MARK_CONV_AS_READ = gql`
	mutation ($id: ID!){
		markConversationAsRead(conversationId: $id)
	}
`;

export const GET_OPONENT_ID = gql`
	query {
		chat @client {
			oponentId
		}
	}
`;
export interface IGetOponentIdResponse {
	chat: {
		oponentId: string;
	};
}
