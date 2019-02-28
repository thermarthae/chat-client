import gql from 'graphql-tag';

export const MARK_CONV_AS_READ = gql`
	mutation markConvAsRead($id: ID!) {
		markConversationAsRead(conversationId: $id)
	}
`;
export interface IMarkConvAsReadRes {
	data: {
		markConversationAsRead: string | null
	};
}



export const GET_CONVERSATION = gql`
	query getConv($id: ID!, $skip: Int!, $limit: Int!) {
		getConversation(id: $id){
			_id
			name
			seen
			messages(skip: $skip, limit: $limit) {
				_id
				author {
					name
				}
				time
				me
				content
				conversation
			}
			draft
		}
	}
`;

export interface IMessage {
	_id: string;
	author: {
		name: string;
	};
	time: string;
	me: boolean;
	content: string;
	conversation: string;
}
export interface IGetConversationResponse {
	getConversation: {
		_id: string;
		name: string;
		seen: boolean;
		messages: IMessage[];
		draft: string;
	};
}


export const GET_MX_SUB_STATUS = gql`
	query getMailboxSubscribeStatus {
		subscriptions @client {
			mailbox
		}
	}
`;
export interface IGetMxSubStatusRes {
	subscriptions: {
		mailbox: boolean;
	};
}

export const TOGGLE_MX_SUB_STATUS = gql`
	mutation toggleMailboxSubscribeStatus {
		toggleSubsciptionStatus(subName: "mailbox") @client {
			mailbox
		}
	}
`;

export const NEW_MESSAGES_SUBSCRIPTION = gql`
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
