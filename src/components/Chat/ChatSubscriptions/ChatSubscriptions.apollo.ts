import gql from 'graphql-tag';
import {
	MessageMailboxFragment, IMessageMailboxFrag,
	ConvMailboxFragment, IConvMailboxFrag
} from '../Mailbox/Mailbox.apollo';

export const NEW_MSG_SUB = gql`
	subscription newMessageAdded {
		newMessageAdded {
			...MessageMailbox
		}
	}
	${MessageMailboxFragment}
`;
export interface INewMsgsSubRes {
	newMessageAdded: IMessageMailboxFrag;
}



export const UPDATED_CONV_SUBSCRIPTION = gql`
	subscription updatedConversation($limit: Int, $skip: Int) {
		updatedConversation {
			...ConversationMailbox
		}
	}
	${ConvMailboxFragment}
`;
export interface IUpdatedConvSubRes {
	updatedConversation: IConvMailboxFrag;
}
