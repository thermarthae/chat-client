import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

// import { connect } from "react-redux";
// import { IAppReducerState } from "../../reducers/app.reducer";
// import { IChatReducerState } from "../../reducers/chat.reducer";

import "../../style/chat.component.scss";

import Menu from "./menu.component";
import Users from "./users.component";
import Inbox from "./inbox.component";
import Aside from "./aside.component";

//interface IChatProps {
// app: IAppReducerState;
// chat: IChatReducerState;
//}

// export default class Chat extends React.PureComponent<IChatProps> {
// 	public render() {
interface IChatRouteProps {
	id: string;
}

const Chat = (props: RouteComponentProps<IChatRouteProps>) => {
	//console.log("Chat", props);
	return (
		<div id="chat">
			<Menu />
			<Users />
			<Inbox oponentId={props.match.params.id} />
			<Aside />
		</div>
	);
};
export default Chat;
// 	}
// }

//<Route path="/:user" component={User} />
//<Router>
//	<Person match={{ params: { id: 0 }, url: "" }} />
//</Router>


// const mapStateToProps = (state: any) => {
// 	return {
// 		app: state.App,
// 		chat: state.Chat
// 	};
// };

// export default connect(mapStateToProps, {})(Chat);
