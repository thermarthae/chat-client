import * as React from "react";
import { Route, Redirect } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import messages from "../locales";

import { connect } from "react-redux";
import { IAppReducerState } from "../reducers/app.reducer";

import "../style/app.component.scss";

import Error from "./error.component";
import Navigator from "./navigator.component";
import Chat from "./chat";
import Login from "./login";


// import { addLocaleData } from "react-intl";
// import * as pl from "react-intl/locale-data/pl";
// addLocaleData(pl);


// const PrivateRoute = ({ component: Component, ...rest }: any) => (
// 	<Route
// 		{...rest}
// 		render={props => {
// 			if (!fakeAuth.isAuthenticated) return <Component {...props} />;
// 			return (
// 				<Redirect
// 					to={{ pathname: "/login", state: { from: props.location } }}
// 				/>
// 			);
// 		}}
// 	/>
// );
// <PrivateRoute path="/chat" component={Chat} />

interface IAppProps {
	app: IAppReducerState;
}

const App = (props: IAppProps) => {
	return (
		<IntlProvider locale={props.app.language} messages={messages[props.app.language]}>
			<BrowserRouter>
				<div id="app">
					{props.app.isAuthenticated && <Navigator />}
					<Switch>
						<Redirect exact from="/" to="/chat" />
						{/* <Route
							path="/chat"
							render={() =>
							state.isAuthenticated ? ( <Chat /> ) : ( <Redirect to="/login" /> )
						}
					/> */}
						<Route path="/chat/:id" component={Chat} />
						<Route path="/chat" component={Chat} />
						<Route path="/login" component={Login} />
						<Route
							component={() => Error({ location })}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		</IntlProvider>
	);
};

const mapStateToProps = (state: any) => {
	return {
		app: state.App,
	};
};

export default connect(mapStateToProps)(App);
