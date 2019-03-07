import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

//TODO: remove
const Subscriptions = {
	defaults: {
		subscriptions: {
			__typename: 'Subscriptions',
			conversations: false
		}
	},
	resolvers: {
		Mutation: {
			toggleSubsciptionStatus: ({ }, { }, { cache }: ApolloClient<any>) => {
				const query = gql`
					query getSubscriptions {
						subscriptions @client {
							conversations
						}
					}
				`;
				const { subscriptions }: any = cache.readQuery({ query });
				const data = {
					subscriptions: Object.assign({}, subscriptions, {
						conversations: !subscriptions.conversations
					})
				};
				cache.writeData({ data });

				return data.subscriptions;
			}
		}
	}
};
export default Subscriptions;
