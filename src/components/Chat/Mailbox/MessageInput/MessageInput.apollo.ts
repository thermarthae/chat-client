import gql from 'graphql-tag';
import { MessageMailboxFragment, IMessageMailboxFrag } from '../Mailbox.apollo';

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
