import gql from 'graphql-tag';

export const MESSAGES_SUBSCRIPTION = gql`
	subscription {
		newMessageAdded {
			_id
			author {
				name
			}
			time
			content
			me
			conversation
		}
	}
`;
export interface INewMessageAdded {
	data?: {
		newMessageAdded: {
			_id: string;
			author: {
				name: string;
			};
			time: string;
			me: boolean;
			content: string;
			conversation: string;
		}
	};
}
