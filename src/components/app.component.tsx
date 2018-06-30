import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import messages from "../locales";

import Query from "react-apollo/Query";
import withApollo, { WithApolloClient } from "react-apollo/withApollo";
import { GET_APP_DATA } from "./app.apollo";

import "../style/app.component.scss";

import Error from "./error.component";
import Navigator from "./navigator.component";
import Chat from "./chat";
import Login from "./login";

interface IPrivateRouteProps extends RouteProps {
	auth: boolean;
	Component: any;
	whenUnlogged?: boolean;
}

const PrivateRoute = ({auth, Component, whenUnlogged, ...rest}: IPrivateRouteProps) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (whenUnlogged) {
					if (!auth) return <Component {...props} />;
					return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
				}
				else {
					if (auth) return <Component {...props} />;
					return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
				}
			}}
		/>
	);
};

interface IAppProps { }
type IAppPropsType = WithApolloClient<IAppProps>;

class App extends React.PureComponent<IAppPropsType> {
	constructor(props: IAppPropsType) {
		super(props);
		const isLoggedIn = document.cookie.includes("sign_token=");
		this.props.client.writeData({ data: { app: { __typename: "App", isLoggedIn } } });
	}

	public render() {
		return (
			<Query query={GET_APP_DATA}>{
				({ data: { app: { language, isLoggedIn } } }) => {
					return <IntlProvider locale={language} messages={messages[language]}>
						<BrowserRouter>
							<div id="app">
								<Navigator />
								<Switch>
									<Redirect exact from="/" to="/chat" />
									<PrivateRoute auth={isLoggedIn} path="/chat/:id" Component={Chat} />
									<PrivateRoute auth={isLoggedIn} path="/chat" Component={Chat} />
									<PrivateRoute auth={isLoggedIn} path="/login" Component={Login} whenUnlogged />
									<Route component={() => Error({ location })} />
								</Switch>
							</div>
						</BrowserRouter>
					</IntlProvider>;
				}
			}</Query>
		);

	}
}

export default withApollo(App);
