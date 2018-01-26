import * as React from "react";
import { NavLink } from "react-router-dom";

import "../style/navigator.component.scss";

const Navigator = () => (
	<nav id="navigator">
		<div className="btn btn-big hamburger">☰</div>
		<NavLink exact={false} className="btn btn-big switch" activeClassName="active" to="/chat">☰</NavLink>
		<NavLink className="btn btn-big switch" activeClassName="active" to="/menu">☰</NavLink>
	</nav>
)
export default Navigator;
