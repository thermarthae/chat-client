import * as React from "react";
import { Route, Redirect } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import messages from "../locales";

import Query from "react-apollo/Query";
import { WithApolloClient } from "react-apollo/withApollo";
import { GET_APP_DATA } from "./app.apollo";

import "../style/app.component.scss";

import Error from "./error.component";
import Navigator from "./navigator.component";
import Chat from "./chat";
import Login from "./login";

interface IAppProps { }

const PrivateRoute = ({ isLoggedIn, component: Component, accessWhenUnlogged, ...rest }: any) => (
	<Route
		{...rest}
		render={props => {
			if (accessWhenUnlogged) {
				if (!isLoggedIn) return <Component {...props} />;

				return (
					<Redirect
						to={{ pathname: "/", state: { from: props.location } }}
					/>
				);
			}
			else {
				if (isLoggedIn) return <Component {...props} />;

				return (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				);
			}
		}}
	/>
);

const App: React.SFC<WithApolloClient<IAppProps>> = props => {
	return (
		<Query query={GET_APP_DATA}>{
			({ data: { app: { language, isLoggedIn } } }) =>
				<IntlProvider locale={language} messages={messages[language]}>
					<BrowserRouter>
						<div id="app">
							{isLoggedIn && <Navigator />}
							<Switch>
								<Redirect exact from="/" to="/chat" />
								<PrivateRoute isLoggedIn={isLoggedIn} path="/chat/:id" component={Chat} />
								<PrivateRoute isLoggedIn={isLoggedIn} path="/chat" component={Chat} />
								<PrivateRoute isLoggedIn={isLoggedIn} path="/login" accessWhenUnlogged component={Login} />
								<Route component={() => Error({ location })} />
							</Switch>
						</div>
					</BrowserRouter>
				</IntlProvider>
		}</Query>
	);
};

export default App;
