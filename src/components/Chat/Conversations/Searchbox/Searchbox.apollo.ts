import gql from 'graphql-tag';
import { ConvNavFragment, IConvNavFragment } from '../Conversations.apollo';

export const SET_SEARCH_STATUS = gql`
	mutation setSearchStatus($status: Boolean!) {
		setSearchStatus(status: $status) @client {
			searchStatus
		}
	}
`;



export const FIND_CONV_AND_USR = gql`
	query findConvsAndUsers($query: String!) {
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
	findConversation: IConvNavFragment[];
	findUser: IUser[];
}
