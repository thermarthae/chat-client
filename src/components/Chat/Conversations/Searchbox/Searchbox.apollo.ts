import gql from 'graphql-tag';
import { ConvNavFragment, IConversation } from '../Conversations.apollo';

export const SET_INBOX_FILTER = gql`
	mutation ($inboxFilter: String!){
		setInboxFilter(inboxFilter: $inboxFilter) @client
	}
`;



export const FIND_CONV_AND_USR = gql`
	query ($query: String!){
		findConversation(query: $query) {
			...ConversationNav
		}
		findUser(query: $query) {
			_id
			name
		}
	}
	${ConvNavFragment}
`;

export interface IUser {
	_id: string;
	name: string;
}
export interface IFindConvAndUsrRes {
	findConversation: IConversation[];
	findUser: IUser[];
}
