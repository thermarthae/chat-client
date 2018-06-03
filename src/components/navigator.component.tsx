import * as React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";

import ApolloClient from "apollo-client/ApolloClient";
import ApolloConsumer from "react-apollo/ApolloConsumer";

import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Chat from "@material-ui/icons/Chat";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";

import "../style/navigator.component.scss";

interface INavigatorProps extends RouteComponentProps<any> { }

const handleLogout = (client: ApolloClient<any>) => {
	client.resetStore();
	localStorage.clear();
};

const Navigator = (prop: INavigatorProps) => (
	<ApolloConsumer>{client =>
		<nav id="navigator">
			<div className="btn btn-big">
				<IconButton className="btn" onClick={() => handleLogout(client)}>
					<PowerSettingsNew style={{ fontSize: "inherit" }} />
				</IconButton>
			</div>
			<NavLink
				exact={false}
				className="btn btn-big switch"
				activeClassName="active"
				to="/chat"
			>
				<IconButton className="btn">
					<Chat style={{ fontSize: "inherit" }} />
				</IconButton>
			</NavLink>
			<NavLink
				className="btn btn-big switch"
				activeClassName="active"
				to="/login"
			>
				<IconButton className="btn">
					<AccountCircle style={{ fontSize: "inherit" }} />
				</IconButton>
			</NavLink>
		</nav>
	}</ApolloConsumer>
);

export default withRouter(Navigator);
