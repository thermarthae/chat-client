import gql from 'graphql-tag';
import { IMessage } from '../Mailbox/Mailbox.apollo';

export const NEW_MSG_SUB = gql`
	subscription newMessageAdded {
		newMessageAdded {
			_id
			author {
				name
			}
			time
			me
			content
			conversation
		}
	}
`;
export interface INewMsgsSubRes {
	data: {
		newMessageAdded: IMessage;
	};
}
