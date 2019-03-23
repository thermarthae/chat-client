import gql from 'graphql-tag';
import { MessageMailboxFragment, IMessageMailboxFrag } from '../Mailbox/Mailbox.apollo';
import { ConvNavFragment, IConvNavFragment } from '../Conversations/Conversations.apollo';

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
	subscription updatedConversation {
		updatedConversation {
			...ConversationNav
		}
	}
	${ConvNavFragment}
`;
export interface IUpdatedConvSubRes {
	updatedConversation: IConvNavFragment;
}
