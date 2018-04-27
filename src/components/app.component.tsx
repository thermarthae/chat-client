import * as React from "react";
import { Route, Redirect } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import messages from "../locales";

import { ApolloClient } from "apollo-boost";
import { Query, withApollo } from "react-apollo";
import * as LocalUserQueries from "../apollo/state/queries/user.queries";

import { connect } from "react-redux";
import { IAppReducerState } from "../reducers/app.reducer";

import "../style/app.component.scss";

import Error from "./error.component";
import Navigator from "./navigator.component";
import Chat from "./chat";
import Login from "./login";

interface IAppProps {
	app: IAppReducerState; //TODO REDUX
	client: ApolloClient<any>;
}

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

const App: React.SFC<IAppProps> = props => {
	return (
		<IntlProvider locale={props.app.language} messages={messages[props.app.language]}>
			<BrowserRouter>
				<Query query={LocalUserQueries.getLoginStatus}>{
					({ data: { isLoggedIn } }) =>
						<div id="app">
							{isLoggedIn && <Navigator />}
							<Switch>
								<Redirect exact from="/" to="/chat" />
								<PrivateRoute isLoggedIn={isLoggedIn} path="/chat/:id" component={Chat} />
								<PrivateRoute isLoggedIn={isLoggedIn} path="/chat" component={Chat} />
								<PrivateRoute isLoggedIn={isLoggedIn} path="/login" accessWhenUnlogged component={Login} />
								<Route
									component={() => Error({ location })}
								/>
							</Switch>
						</div>
				}</Query>
			</BrowserRouter>
		</IntlProvider>
	);
};

const mapStateToProps = (state: any) => {
	return {
		app: state.App,
	};
};

export default withApollo(connect(mapStateToProps)(App));
