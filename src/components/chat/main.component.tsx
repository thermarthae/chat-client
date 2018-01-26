import * as React from "react";

import "../../style/chat.component.scss";

import Menu from "./menu.component"
import Submenu from "./submenu.component"
import Inbox from "./inbox.component"
import Aside from "./aside.component"

export default class Chat extends React.Component {
	public render() {
		return (
			<div id="chat">
				<Menu/>
				<Submenu/>
				<Inbox/>
				<Aside/>
			</div>
		);
	}
}
