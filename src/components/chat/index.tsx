import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import "../../style/chat.component.scss";

import Menu from "./menu.component";
import Users from "./users.component";
import Inbox from "./inbox.component";

interface IChatRouteProps {
	id: string;
}

const Chat = (props: RouteComponentProps<IChatRouteProps>) => {
	return (
		<div id="chat">
			<Menu />
			<Users oponentId={props.match.params.id} />
			<Inbox oponentId={props.match.params.id} />
		</div>
	);
};
export default Chat;
