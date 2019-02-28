import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

const Subscriptions = {
	defaults: {
		subscriptions: {
			__typename: 'Subscriptions',
			conversations: false,
			mailbox: false
		}
	},
	resolvers: {
		Mutation: {
			toggleSubsciptionStatus: ({ }, { subName }: any, { cache }: ApolloClient<any>) => {
				const query = gql`
					query getSubscriptions {
						subscriptions @client {
							conversations
							mailbox
						}
					}
				`;
				const { subscriptions }: any = cache.readQuery({ query });
				const data = {
					subscriptions: Object.assign({}, subscriptions, {
						[subName]: !subscriptions[subName]
					})
				};
				cache.writeData({ data });

				return data.subscriptions;
			}
		}
	}
};
export default Subscriptions;
