import * as React from "react";

import { connect } from "react-redux";
import { IChatReducerState } from "../../reducers/chat.reducer";

import "../../style/aside.component.scss";

interface IAsideProps {
	chat: IChatReducerState;
}

const Aside: React.SFC<IAsideProps> = props => {
	return (
		<div id="aside" className={props.chat.asideIsOpen ? "active" : ""}></div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		chat: state.Chat
	};
};

export default connect(mapStateToProps, {})(Aside);
