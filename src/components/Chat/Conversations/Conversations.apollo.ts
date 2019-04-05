import gql from 'graphql-tag';
import { ConvMailboxFragment, IConvMailboxFrag } from '../Mailbox/Mailbox.apollo';

export const GET_CONV_ARR = gql`
	query getConvArr($limit: Int = 1, $skip: Int) {
		getUserConversations {
			...ConversationMailbox
		}
	}
	${ConvMailboxFragment}
`;
export interface IGetConvArrResponse {
	getUserConversations: IConvMailboxFrag[];
}
