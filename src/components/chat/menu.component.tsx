import * as React from "react";
import { FormattedMessage } from "react-intl";

import { connect, Dispatch } from "react-redux";
import { IAppReducerState } from "../../reducers/app.reducer";
import { IChatAction, ChatActions, TInboxFilter } from "../../actions/chat.actions";
import { IChatReducerState } from "../../reducers/chat.reducer";

import IconButton from "material-ui/IconButton";
import PersonAdd from "material-ui-icons/PersonAdd";
import List, { ListItem } from "material-ui/List";

import "../../style/menu.component.scss";

interface IMenuProps {
	app: IAppReducerState;
	chat: IChatReducerState;
	setInboxFilter: (filter: TInboxFilter) => IChatAction;
}

const Menu = (props: IMenuProps) => {
	return (
		<div
			id="menu"
			className={props.app.menuIsOpen ? "active" : ""}
		>
			<div className="head">
				<span className="title">
					<FormattedMessage id="chat.menu.title" defaultMessage="Inbox" />
				</span>
				<IconButton className="btn">
					<PersonAdd style={{ fontSize: "inherit" }} />
				</IconButton>
			</div>
			<div className="wrapper">
				<List className="container">
					<ListItem
						button
						onClick={() => props.setInboxFilter(null)}
						className={"line" + (props.chat.inboxFilter === null ? " active" : "")}
					>
						<span className="name"><FormattedMessage id="chat.menu.allMessages" defaultMessage="All messages" /></span>
						<span className="count">{(props.chat.inbox || []).length}</span>
					</ListItem>
					<ListItem
						button
						onClick={() => props.setInboxFilter("unread")}
						className={"line" + (props.chat.inboxFilter === "unread" ? " active" : "")}
					>
						<span className="name"><FormattedMessage id="chat.menu.unread" defaultMessage="Unread" /></span>
						<span className="count">{props.chat.unread}</span>
					</ListItem>
					<ListItem
						button
						onClick={() => props.setInboxFilter("draft")}
						className={"line" + (props.chat.inboxFilter === "draft" ? " active" : "")}
					>
						<span className="name"><FormattedMessage id="chat.menu.draft" defaultMessage="Draft" /></span>
						<span className="count">{props.chat.draft}</span>
					</ListItem>
				</List>
				<div className="separator" />
				<List className="container">
					<ListItem
						button
						onClick={() => props.setInboxFilter("groups")}
						className={"line" + (props.chat.inboxFilter === "groups" ? " active" : "")}
					>
						<span className="name"><FormattedMessage id="chat.menu.groups" defaultMessage="Groups" /></span>
						<span className="count">{props.chat.groups}</span>
					</ListItem>
				</List>
				<div className="separator" />
				<List className="container">
					<ListItem
						button
						className="line"
					>
						<span className="name"><FormattedMessage id="chat.menu.help" defaultMessage="Help" /></span>
					</ListItem>
					<ListItem
						button
						className="line"
					>
						<span className="name"><FormattedMessage id="chat.menu.settings" defaultMessage="Settings" /></span>
					</ListItem>
				</List>
			</div>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		app: state.App,
		chat: state.Chat
	};
};

const mapDispatchToProps = (dispatch: Dispatch<IChatAction>) => {
	return {
		setInboxFilter: (filter: TInboxFilter) => dispatch(ChatActions.setInboxFilter(filter)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
