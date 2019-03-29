import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getOperationAST } from 'graphql/utilities/getOperationAST';

const cache = new InMemoryCache({
	dataIdFromObject: (object: any) => object._id,
});

export const client = new ApolloClient({
	cache,
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, path }) =>
					console.warn(`[GraphQL error]: Message: ${message}, Path: ${path}`)
				);
			if (networkError) console.log(`[Network error (logout)]: ${networkError}`);
		}),
		ApolloLink.split(
			operation => {
				const operationAST = getOperationAST(operation.query, operation.operationName);
				return !!operationAST && operationAST.operation === 'subscription';
			},
			new WebSocketLink({
				uri: `ws://localhost:3000/graphql`,
				options: {
					reconnect: true
				}
			}),
			new BatchHttpLink({
				uri: 'http://localhost:3000/graphql',
				credentials: 'include'
			}),
		)
	])
});
const clearStore = async () => {
	await client.clearStore();
};
client.onResetStore(clearStore);
