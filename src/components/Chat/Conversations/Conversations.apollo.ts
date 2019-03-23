import gql from 'graphql-tag';

export const GET_SEARCH_STATUS = gql`
	query getSearchStatus {
		chat @client {
			searchStatus
		}
	}
`;
export interface IGetSearchStatusRes {
	chat: {
		searchStatus: boolean;
	};
}

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
export const GET_CONV_ARR = gql`
	query getConvArr {
		getUserConversations {
			...ConversationNav
		}
	}
	${ConvNavFragment}
`;

export interface IMessage {
	_id: string;
	content: string;
	time: string;
	me: boolean;
	conversation: string;
}
export interface IConversation {
	_id: string;
	name: string;
	seen: boolean;
	draft: string;
	messages: IMessage[];
}
export interface IGetConvArrResponse {
	getUserConversations: IConversation[];
}


export const GET_SUB_STATUS = gql`
	query getConvSubscribeStatus {
		subscriptions @client {
			conversations
		}
	}
`;
export interface IGetConvSubStatusRes {
	subscriptions: {
		conversations: boolean;
	};
}

//TODO: Remove soon
export const TOGGLE_CONV_SUB_STATUS = gql`
	mutation toggleConvSubscribeStatus {
		toggleSubsciptionStatus @client {
			conversations
		}
	}
`;

export const UPDATED_CONV_SUBSCRIPTION = gql`
	subscription updatedConversation {
		updatedConversation {
			...ConversationNav
		}
	}
	${ConvNavFragment}
`;

export interface IUpdatedConvSubRes {
	updatedConversation: IConversation;
}
