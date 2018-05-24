import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import defaults from "./state/defaults";
import mutations from "./state/mutations";
// import queries from "./apollo/state/resolvers/queries";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import "./style/index.scss";
import App from "./components/app.component";

export const client = new ApolloClient({
	uri: "http://localhost:3000/graphql",
	fetchOptions: {
		credentials: "include" //TODO CORS
	},
	request: async operation => {
		const token = localStorage.getItem("access_token") || "";
		operation.setContext({
			headers: {
				authorization: "bearer " + token
			}
		});
	},
	clientState: {
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
		`
	},
	onError: ({ graphQLErrors, networkError }) => {
		if (graphQLErrors) console.warn("graphQLErrors (to log)", graphQLErrors); // sendToLoggingService(graphQLErrors);
		if (networkError) console.warn("networkError (logout)", networkError); // logoutUser();
	}
});


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

const render = (Component: any) => {
	ReactDOM.render(
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
render(App);

// Webpack Hot Module Replacement API
declare let module: {
	hot: any;
};

if (module.hot)
	module.hot.accept("./components/app.component", () => {
		const NewApp = require("./components/app.component").default;
		render(NewApp);
	});
