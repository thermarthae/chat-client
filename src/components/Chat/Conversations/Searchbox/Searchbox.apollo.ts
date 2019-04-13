import gql from 'graphql-tag';
import { ConvMailboxFragment, IConvMailboxFrag } from '../../Mailbox/Mailbox.apollo';

export const FIND_CONV_AND_USR = gql`
	query findConvsAndUsers($query: String!, $limit: Int = 1, $cursor: ID) {
		findConversation(query: $query) {
			...ConversationMailbox
		}
		findUser(query: $query) {
			_id
			name
		}
	}
	${ConvMailboxFragment}
`;

export interface IUser {
	_id: string;
	name: string;
}
export interface IFindConvAndUsrRes {
	findConversation: IConvMailboxFrag[];
	findUser: IUser[];
}
