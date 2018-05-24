import * as React from "react";
import { FormattedMessage } from "react-intl";

import { Query, Mutation } from "react-apollo";
import { SET_INBOX_FILTER, GET_CURRENT_USER, IGetCurrentUserResponse } from "../../apollo/chat/menu.apollo";

import { IconButton, List, ListItem } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";

import "../../style/menu.component.scss";

const Menu = () => {
	return (
		<div id="menu">
			<div className="head">
				<span className="title">
					<FormattedMessage id="chat.menu.title" />
				</span>
				<IconButton className="btn">
					<PersonAdd style={{ fontSize: "inherit" }} />
				</IconButton>
			</div>
			<Query query={GET_CURRENT_USER}>
				{({ loading, error, data }) => {
					if (error) return `Error! ${error.message}`;
					if (loading) return "Loading...";

					const {
						currentUser: { conversationData: {
							conversationCount,
							draftCount,
							unreadCount
						} },
						chat: {
							inboxFilter
						}
					}: IGetCurrentUserResponse = data;

					return <Mutation mutation={SET_INBOX_FILTER}>
						{setInboxFilter =>
							<div className="wrapper">
								<List className="container">
									<ListItem
										button
										onClick={() => setInboxFilter({ variables: { inboxFilter: "UNREAD" } })}
										className={"line" + (inboxFilter === "UNREAD" ? " active" : "")}
									>
										<span className="name"><FormattedMessage id="chat.menu.inbox" /></span>
										<span className="count">{unreadCount}</span>
									</ListItem>
									<ListItem
										button
										onClick={() => setInboxFilter({ variables: { inboxFilter: "ALL" } })}
										className={"line" + (inboxFilter === "ALL" ? " active" : "")}
									>
										<span className="name"><FormattedMessage id="chat.menu.allMessages" /></span>
										<span className="count">{conversationCount}</span>
									</ListItem>
									<ListItem
										button
										onClick={() => setInboxFilter({ variables: { inboxFilter: "DRAFT" } })}
										className={"line" + (inboxFilter === "DRAFT" ? " active" : "")}
									>
										<span className="name"><FormattedMessage id="chat.menu.draft" /></span>
										<span className="count">{draftCount}</span>
									</ListItem>
								</List>
								<div className="separator" />
								<List className="container">
									<ListItem
										button
										className="line"
									>
										<span className="name"><FormattedMessage id="chat.menu.help" /></span>
									</ListItem>
									<ListItem
										button
										className="line"
									>
										<span className="name"><FormattedMessage id="chat.menu.settings" /></span>
									</ListItem>
								</List>
							</div>
						}
					</Mutation>;
				}}
			</Query>
		</div>
	);
};

export default Menu;
