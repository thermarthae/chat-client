import gql from 'graphql-tag';
import { MessageMailboxFragment, MessageMailboxFragmentDoc } from '@codegen';

export const SEND_MESSAGE = gql`
	mutation sendMessage($conversationId: ID!, $message: String!) {
		sendMessage(conversationId: $conversationId, message: $message){
			...MessageMailbox
		}
	}
	${MessageMailboxFragmentDoc}
`;
export interface ISendMessageRes {
	sendMessage: MessageMailboxFragment;
}
