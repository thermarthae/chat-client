import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { withClientState } from "apollo-link-state";
import { ApolloLink, Observable } from "apollo-link";
import defaults from "./state/defaults";
import mutations from "./state/mutations";
// import queries from "./apollo/state/resolvers/queries";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./style/index.scss";
import App from "./components/app.component";

const request = (operation: any) => {
	const token = localStorage.getItem("access_token") || "";
	operation.setContext({
		headers: {
			authorization: "bearer " + token
		}
	});
};

const requestLink = new ApolloLink((operation, forward: any) =>
	new Observable(observer => {
		let handle: any;
		Promise.resolve(operation)
			.then(oper => request(oper))
			.then(() => {
				handle = forward(operation).subscribe({
					next: observer.next.bind(observer),
					error: observer.error.bind(observer),
					complete: observer.complete.bind(observer),
				});
			})
			.catch(observer.error.bind(observer));

		return () => { if (handle) handle.unsubscribe(); };
	})
);

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
		requestLink,
		stateLink,
		new HttpLink({
			uri: "http://localhost:3000/graphql"
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
