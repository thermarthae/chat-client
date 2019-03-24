import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

const Chat = {
	defaults: {
		chat: {
			__typename: 'Chat',
			isAsideOpen: false,
			oponentId: null,
		}
	},
	resolvers: {
		Mutation: {
			toggleAside: (_: undefined, { }: any, { cache }: ApolloClient<any>) => {
				const query = gql`
					query getAsideStatus {
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
				return data.chat;
			},
			setOponentId: (_: undefined, { oponentId }: any, { cache }: ApolloClient<any>) => {
				const data = {
					chat: {
						__typename: 'Chat',
						oponentId: oponentId || null
					}
				};
				cache.writeData({ data });
				return data.chat;
			}
		}
	}
};
export default Chat;
