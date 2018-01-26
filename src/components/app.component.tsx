import * as React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import {IMapState} from "../containers/app.container";
import {IActionFunction} from "../actions/app.actions";

import "../style/app.component.scss";

import Navigator from"./navigator.component"
import Chat from "./chat/main.component"

export interface IAppProps extends IMapState {
	setNickname: IActionFunction
}

export default class App extends React.Component<IAppProps> {
	public render() {
		return (
			<BrowserRouter>
				<div id="application">
					<Route path="/" component={Navigator}/>
					<Route exact path="/" component={Chat}/>
					<Route path="/chat" component={Chat}/>
				</div>
			</BrowserRouter>
		);
	}

	// <Route path="/" component={Navigator}/>
	// <Route exact path="/" component={Chat}/>
	// <Route path="/menu" component={Menu}/>
	// public render() {
	// 	return (
	// 		<div id="application">
	// 			<Navigator/>
	// 			<Menu/>
	// 			<Submenu/>
	// 			<Chat/>
	// 			<Aside/>
	// 		</div>
	// 	);
	// }
}
