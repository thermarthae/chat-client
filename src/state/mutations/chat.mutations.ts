import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

export const toggleAside = (_: undefined, { }: any, { cache }: ApolloClient<any>) => {
	const query = gql`
		query {
			chat {
				isAsideOpen @client
			}
		}
	`;
	const { chat: { isAsideOpen } }: any = cache.readQuery({ query });
	const data = {
		chat: {
			__typename: "Chat",
			isAsideOpen: !isAsideOpen
		}
	};

	cache.writeData({ data });
	return null;
};

export const setInboxFilter = (_: undefined, { inboxFilter }: any, { cache }: ApolloClient<any>) => {
	const data = {
		chat: {
			__typename: "Chat",
			inboxFilter
		}
	};
	cache.writeData({ data });
	return null;
};
