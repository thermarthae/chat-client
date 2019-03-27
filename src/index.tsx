import './bootstrap';
import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ThemeProvider } from '@material-ui/styles';

import { client } from './providers/apolloClient';
import theme from './providers/materialTheme';

import './index.css';
import App from './components/App';

const WrappedApp = () => (
	<ApolloProvider client={client}>
		<ApolloHooksProvider client={client}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ApolloHooksProvider>
	</ApolloProvider>
);

const Hot = hot(WrappedApp);

render(<Hot />, document.getElementById('root'));
