import * as React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";

import { connect, Dispatch } from "react-redux";
import { IAppAction, AppActions } from "../actions/app.actions";

import { ApolloClient } from "apollo-boost";
import { withApollo } from "react-apollo";
import * as StateUserMutations from "../apollo/state/mutations/user.mutations";

import IconButton from "material-ui/IconButton";
import Menu from "@material-ui/icons/Menu";
import Chat from "@material-ui/icons/Chat";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";

import "../style/navigator.component.scss";

interface INavigatorProps extends RouteComponentProps<any> {
	client: ApolloClient<any>;
	toggleMenu: () => IAppAction; //REDUX
	changeLanguage: (x: string) => IAppAction; //REDUX
}

const handleLogout = async (client: ApolloClient<any>) => {
	await client.mutate({
		mutation: StateUserMutations.logOut,
	});
};

const Navigator = (prop: INavigatorProps) => (
	<nav id="navigator">
		<div className="btn btn-big hamburger">
			<IconButton className="btn" onClick={prop.toggleMenu}>
				<Menu style={{ fontSize: "inherit" }}/>
			</IconButton>
		</div>
		<div className="btn btn-big">
			<IconButton className="btn" onClick={() => handleLogout(prop.client)}>
				<PowerSettingsNew style={{ fontSize: "inherit" }}/>
			</IconButton>
		</div>
		<NavLink
			exact={false}
			className="btn btn-big switch"
			activeClassName="active"
			to="/chat"
		>
			<IconButton className="btn">
				<Chat style={{ fontSize: "inherit" }}/>
			</IconButton>
		</NavLink>
		<NavLink
			className="btn btn-big switch"
			activeClassName="active"
			to="/login"
		>
			<IconButton className="btn">
				<AccountCircle style={{ fontSize: "inherit" }}/>
			</IconButton>
		</NavLink>
		<div className="btn btn-big">
			<IconButton className="btn" onClick={() => prop.changeLanguage("pl")}>PL</IconButton>
		</div>
		<div className="btn btn-big">
			<IconButton className="btn" onClick={() => prop.changeLanguage("en")}>EN</IconButton>
		</div>
	</nav>
);

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
	return {
		toggleMenu: () => dispatch(AppActions.toggleMenu()),
		changeLanguage: (x: string) => dispatch(AppActions.changeLanguage(x)),
	};
};

export default withRouter(connect(undefined, mapDispatchToProps)(withApollo(Navigator)));
