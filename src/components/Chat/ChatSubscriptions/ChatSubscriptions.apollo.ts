import gql from 'graphql-tag';
import { MessageMailboxFragment, IMessageMailboxFrag } from '../Mailbox/Mailbox.apollo';

export const NEW_MSG_SUB = gql`
	subscription newMessageAdded {
		newMessageAdded {
			...MessageMailbox
		}
	}
	${MessageMailboxFragment}
`;
export interface INewMsgsSubRes {
	data: {
		newMessageAdded: IMessageMailboxFrag;
	};
}
