import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import defaults from "./state/defaults";
import mutations from "./state/mutations";
// import queries from "./apollo/state/resolvers/queries";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./style/index.scss";
import App from "./components/app.component";

const getTokenLink = new ApolloLink((operation, forward: any) => {
	operation.setContext({
		headers: {
			"x-token": localStorage.getItem("token") || null,
			"x-refresh-token": localStorage.getItem("refreshToken") || null,
		}
	});
	if (forward) return forward(operation);
	return null;
});

const setTokenLink = new ApolloLink((operation, forward) => {
	if (forward) return forward(operation).map(response => {
		try {
			localStorage.setItem("token", response.data!.getAccess.access_token);
			localStorage.setItem("refreshToken", response.data!.getAccess.refresh_token);
		} catch (err) {} // tslint:disable-line

		return response;
	});
	return null;
});

const cache = new InMemoryCache();

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
			if (graphQLErrors) console.warn("graphQLErrors (to log)", graphQLErrors); // sendToLoggingService(graphQLErrors);
			if (networkError) console.warn("networkError (logout)", networkError); // logoutUser();
		}),
		getTokenLink,
		setTokenLink,
		stateLink,
		new BatchHttpLink({
			uri: "http://localhost:3000/graphql",
			credentials: "include"
		})
	])
});
client.onResetStore(stateLink.writeDefaults as any);

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#3a3d5a"
		},
		secondary: {
			main: "#ff0000"
		}
	}
});

const rootEl = document.getElementById("root");

const renderComponent = (Component: any) => {
	render(
		<AppContainer>
			<ApolloProvider client={client}>
				<MuiThemeProvider theme={theme}>
					<Component />
				</MuiThemeProvider>
			</ApolloProvider>
		</AppContainer>,
		rootEl
	);
};
renderComponent(App);

// Webpack Hot Module Replacement API
declare let module: {
	hot: any;
};

if (module.hot)
	module.hot.accept("./components/app.component", () => {
		const NewApp = require("./components/app.component").default;
		renderComponent(NewApp);
	});
