import * as React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";

import { ApolloClient } from "apollo-boost";
import { ApolloConsumer } from "react-apollo";
import { SET_LOGOUT_STATUS } from "../apollo/navigator.apollo";

import { IconButton } from "@material-ui/core";
import { AccountCircle, Chat, PowerSettingsNew } from "@material-ui/icons";

import "../style/navigator.component.scss";

interface INavigatorProps extends RouteComponentProps<any> { }

const handleLogout = async (client: ApolloClient<any>) => {//TODO
	await client.mutate({ mutation: SET_LOGOUT_STATUS });
	client.resetStore();
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
