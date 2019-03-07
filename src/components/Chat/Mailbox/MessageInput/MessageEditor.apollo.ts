import gql from 'graphql-tag';

export const GET_OPONENT_ID = gql`
	query getOponentID2 {
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

export const SEND_MESSAGE = gql`
	mutation sendMessage($conversationId: ID!, $message: String!) {
		sendMessage(conversationId: $conversationId, message: $message){
			_id
			me
			author {
				name
			}
			content
			time
			conversation
		}
	}
`;
