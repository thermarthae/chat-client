import './bootstrap';
import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';

import { client } from './providers/apolloClient';
import theme from './providers/materialTheme';

import App from './components/App';

const WrappedApp = () => (
	<ApolloProvider client={client}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</ApolloProvider>
);

const Hot = hot(module)(WrappedApp);

render(<Hot />, document.getElementById('root'));
