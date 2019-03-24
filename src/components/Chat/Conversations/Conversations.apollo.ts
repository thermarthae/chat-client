import gql from 'graphql-tag';

export const ConvNavFragment = gql`
	fragment ConversationNav on Conversation {
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
`;
export interface IMessage {
	_id: string;
	content: string;
	time: string;
	me: boolean;
	conversation: string;
}
export interface IConvNavFragment {
	_id: string;
	name: string;
	seen: boolean;
	draft: string;
	messages: IMessage[];
}



export const GET_CONV_ARR = gql`
	query getConvArr {
		getUserConversations {
			...ConversationNav
		}
	}
	${ConvNavFragment}
`;
export interface IGetConvArrResponse {
	getUserConversations: IConvNavFragment[];
}


