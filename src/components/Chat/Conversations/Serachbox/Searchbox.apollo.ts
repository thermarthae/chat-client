import gql from 'graphql-tag';

export const SET_INBOX_FILTER = gql`
	mutation ($inboxFilter: String!){
		setInboxFilter(inboxFilter: $inboxFilter) @client
	}
`;



export const FIND_CONV_AND_USR = gql`
	query ($query: String!){
		findConversation(query: $query) {
			_id
			name
			seen
			draft
			messages(limit: 1) {
				_id
				content
				time
				me
				conversation
			}
		}
		findUser(query: $query) {
			_id
			name
		}
	}
`;
export interface IConversation {
	_id: string;
	name: string;
	seen: boolean;
	draft: string;
	messages: [{
		_id: string;
		content: string;
		time: string;
		me: boolean;
		conversation: string;
	}];
}
export interface IUser {
	_id: string;
	name: string;
}
export interface IFindConvAndUsrRes {
	findConversation: IConversation[];
	findUser: IUser[];
}
