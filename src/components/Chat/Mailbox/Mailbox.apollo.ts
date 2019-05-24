import gql from 'graphql-tag';

export const MARK_CONV_AS_READ = gql`
	mutation markConvAsRead($id: ID!) {
		markConversationAsRead(conversationId: $id)
	}
`;
export interface IMarkConvAsReadRes {
	markConversationAsRead: string | null;
}



export const MessageMailboxFragment = gql`
	fragment MessageMailbox on Message {
		_id
		author {
			name
		}
		time
		me
		content
		conversation
	}
`;
export interface IMessageMailboxFrag {
	_id: string;
	author: {
		name: string;
	};
	time: string;
	me: boolean;
	content: string;
	conversation: string;
}



export const ConvMailboxFragment = gql`
	fragment ConversationMailbox on Conversation {
		_id
		friendlyID
		name
		seen
		draft
		messageFeed(limit: $limit, cursor: $cursor) @connection(key: "messageFeed", filter: ["limit"]) {
			cursor
			noMore
			node {
				...MessageMailbox
			}
		}
	}
	${MessageMailboxFragment}
`;
export interface IMailboxMessageFeed {
	cursor: string | null;
	noMore: boolean;
	node: IMessageMailboxFrag[];
}
export interface IConvMailboxFrag {
	_id: string;
	friendlyID: string;
	name: string;
	seen: boolean;
	messageFeed: IMailboxMessageFeed;
	draft: string;
}



export const GET_CONVERSATION = gql`
	query getConv($id: ID!, $limit: Int, $cursor: ID) {
		getConversation(id: $id) {
			...ConversationMailbox
		}
	}
	${ConvMailboxFragment}
`;
export interface IGetConvRes {
	getConversation: IConvMailboxFrag;
}
