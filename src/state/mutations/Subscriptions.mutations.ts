import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

export const toggleSubsciptionStatus = ({ }, { subName }: any, { cache }: ApolloClient<any>) => {
	const query = gql`
		query {
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

	return null;
};
