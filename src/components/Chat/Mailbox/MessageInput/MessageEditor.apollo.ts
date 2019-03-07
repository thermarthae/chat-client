import gql from 'graphql-tag';
import { MessageMailboxFragment, IMessageMailboxFrag } from '../Mailbox.apollo';

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
			...MessageMailbox
		}
	}
	${MessageMailboxFragment}
`;
export interface ISendMessageRes {
	sendMessage: IMessageMailboxFrag;
}
