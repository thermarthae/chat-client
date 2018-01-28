import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import "./style/index.scss";
import App from "./components/app.component";
import store from "./stores";

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

const httpLink = new HttpLink({ uri: "http://localhost:3000" });
const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	connectToDevTools: false //TODO
});

const rootEl = document.getElementById("root");

const render = (Component: any) => {
	ReactDOM.render(
		<AppContainer>
			<ApolloProvider client={client}>
				<Provider store={store}>
					<MuiThemeProvider theme={theme}>
						<Component />
					</MuiThemeProvider>
				</Provider>
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
