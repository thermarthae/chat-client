import * as React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";

import { connect, Dispatch } from "react-redux";
import { IAppAction, AppActions } from "../actions/app.actions";

import IconButton from "material-ui/IconButton";
import Menu from "material-ui-icons/Menu";
import Chat from "material-ui-icons/Chat";
import AccountCircle from "material-ui-icons/AccountCircle";

import "../style/navigator.component.scss";

interface INavigatorProps extends RouteComponentProps<any> {
	toggleMenu: () => IAppAction;
	changeLanguage: (x: string) => IAppAction;
}

const Navigator = (prop: INavigatorProps) => (
	<nav id="navigator">
		<div className="btn btn-big hamburger">
			<IconButton className="btn" onClick={prop.toggleMenu}>
				<Menu style={{ fontSize: "inherit" }}/>
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
			<IconButton className="btn" onClick={() => prop.changeLanguage("pl")}>Ó</IconButton>
		</div>
		<div className="btn btn-big">
			<IconButton className="btn" onClick={() => prop.changeLanguage("en")}>O</IconButton>
		</div>
	</nav>
);

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
	return {
		toggleMenu: () => dispatch(AppActions.toggleMenu()),
		changeLanguage: (x: string) => dispatch(AppActions.changeLanguage(x)),
	};
};

export default withRouter(connect(undefined, mapDispatchToProps)(Navigator));
