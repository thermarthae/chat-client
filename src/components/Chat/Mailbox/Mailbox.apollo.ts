import gql from 'graphql-tag';

export const MARK_CONV_AS_READ = gql`
	mutation markConvAsRead($id: ID!) {
		markConversationAsRead(conversationId: $id)
	}
`;


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


export const ConvMailboxFragment = gql`
	fragment ConversationMailbox on Conversation {
		_id
		name
		seen
		draft
		messages(skip: $skip, limit: $limit) {
			...MessageMailbox
		}
	}
	${MessageMailboxFragment}
`;


export const GET_CONVERSATION = gql`
	query getConv($id: ID!, $skip: Int, $limit: Int) {
		getConversation(id: $id) {
			...ConversationMailbox
		}
	}
	${ConvMailboxFragment}
`;
