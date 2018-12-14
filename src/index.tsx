import './bootstrap';
import * as React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getOperationAST } from 'graphql/utilities/getOperationAST';
import { ThemeProvider } from '@material-ui/styles';

import defaults from './state/defaults';
import mutations from './state/mutations';
// import queries from './apollo/state/resolvers/queries';

import './style/index.scss';
import theme from './theme';
import App from './components/App';

const cache = new InMemoryCache({
	dataIdFromObject: (object: any) => object._id,
});

const stateLink = withClientState({
	cache,
	defaults,
	resolvers: {
		// Query: { ...queries },
		Mutation: { ...mutations },
	},
	typeDefs: `
		enum conversationFilter {
			ALL
			UNREAD
			DRAFT
		}
	`,
});

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, path }) =>
					console.warn(`[GraphQL error]: Message: ${message}, Path: ${path}`)
				);
			if (networkError) console.log(`[Network error (logout)]: ${networkError}`);
		}),
		stateLink,
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
client.onResetStore(stateLink.writeDefaults as any);

const Hot = hot(module)(() => (
	<ApolloProvider client={client}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</ApolloProvider>
));

render(
	<Hot />,
	document.getElementById('root')
);
