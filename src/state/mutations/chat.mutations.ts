import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

export const toggleAside = (_: undefined, { }: any, { cache }: ApolloClient<any>) => {
	const query = gql`
		query {
			chat @client {
				isAsideOpen
			}
		}
	`;
	const { chat: { isAsideOpen } }: any = cache.readQuery({ query });
	const data = {
		chat: {
			__typename: 'Chat',
			isAsideOpen: !isAsideOpen
		}
	};

	cache.writeData({ data });
	return null;
};

export const setInboxFilter = (_: undefined, { inboxFilter }: any, { cache }: ApolloClient<any>) => {
	const data = {
		chat: {
			__typename: 'Chat',
			inboxFilter
		}
	};
	cache.writeData({ data });
	return null;
};

export const setOponentId = (_: undefined, { oponentId }: any, { cache }: ApolloClient<any>) => {
	const data = {
		chat: {
			__typename: 'Chat',
			oponentId: oponentId || null
		}
	};
	cache.writeData({ data });
	return null;
};
