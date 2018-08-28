import gql from 'graphql-tag';

export const GET_CONVARR_AND_FILTER = gql`
	query {
		chat @client {
			inboxFilter
		}
		userConversations {
			conversationArr {
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
export interface IGetConvArrAndFilterResponse {
	chat: {
		inboxFilter: 'UNREAD' | 'ALL' | 'DRAFT';
	};
	userConversations: {
		conversationArr: IConversation[];
	};
}
