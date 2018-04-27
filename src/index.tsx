import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import defaults from "./apollo/state/defaults";
import mutations from "./apollo/state/resolvers/mutations";
import queries from "./apollo/state/resolvers/queries";

import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import "./style/index.scss";
import App from "./components/app.component";
import store from "./stores";

export const client = new ApolloClient({
	uri: "http://localhost:3000/graphql",
	fetchOptions: {
		credentials: "include" //TODO CORS
	},
	request: async operation => {
		const token = localStorage.getItem("token") || "";
		operation.setContext({
			headers: {
				authorization: "bearer " + token
			}
		});
	},
	clientState: {
		defaults,
		resolvers: {
			Query: { ...queries },
			Mutation: { ...mutations },
		},
		typeDefs: [

		]
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
			<Provider store={store}>
				<ApolloProvider client={client}>
					<MuiThemeProvider theme={theme}>
						<Component />
					</MuiThemeProvider>
				</ApolloProvider>
			</Provider>
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
