import gql from 'graphql-tag';
import { MessageMailboxFragment, MessageMailboxFragmentDoc } from '@codegen';
import { ConvNavFragment, IConvNavFragment } from '../Conversations/Conversations.apollo';

export const NEW_MSG_SUB = gql`
	subscription newMessageAdded {
		newMessageAdded {
			...MessageMailbox
		}
	}
	${MessageMailboxFragmentDoc}
`;
export interface INewMsgsSubRes {
	newMessageAdded: MessageMailboxFragment;
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
