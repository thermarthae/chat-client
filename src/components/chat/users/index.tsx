import * as React from "react";
import { Link } from "react-router-dom";

import { injectIntl, InjectedIntlProps } from "react-intl";

import Query from "react-apollo/Query";
import {
	GET_INBOX_FILTER,
	GET_CONVERSATION_LIST, IGetConversationListResponse
} from "./index.apollo";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreHoriz from "@material-ui/icons/MoreHoriz";

import "../../../style/users.component.scss";

import Searchbox from "./searchbox.component";

const FakeMessage = () => {
	return (
		<div className="fake">
			<div className="content">
				<div className="avatar"></div>
				<div className="clear"></div>
				<div className="center">
					<div className="top">
						<div className="clear"></div>
					</div>
					<div className="bottom">
						<div className="clear"></div>
					</div>
				</div>
			</div>
		</div>

	);
};

interface IUsersProps {
	oponentId?: string;
}

interface IUsersStates {
	menuAnchorEl: HTMLElement | undefined;
}

class Users extends React.PureComponent<IUsersProps & InjectedIntlProps, IUsersStates> {
	public state = {
		menuAnchorEl: undefined,
	};

	public handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		this.setState({ menuAnchorEl: event.currentTarget });
	}

	public handleMenuClose = () => {
		this.setState({ menuAnchorEl: undefined });
	}

	public render() {
		const { oponentId, intl: { formatMessage } } = this.props;
		const { menuAnchorEl } = this.state;

		return <div id="users">
			<Searchbox/>
			<Query query={GET_INBOX_FILTER}>{
				({ data: { chat: { inboxFilter } } }) =>
					<Query query={GET_CONVERSATION_LIST} variables={{ filter: inboxFilter }}>
						{({ loading, error, data }) => {
							if (error) return `Error! ${error.message}`;
							if (loading) return (
								<div className="list">
									<FakeMessage/>
									<FakeMessage/>
									<FakeMessage/>
									<div className="background"/>
								</div>
							);

							const {
								currentUser: { conversationData: {
									conversationArr
								} }
							}: IGetConversationListResponse = data;

							if (!conversationArr[0]) return (
								<div className="list empty">
									<span>
										{formatMessage({ id: "chat.users.nothingToShow" })}
									</span>
								</div>
							);

							return <div className="list">
								{conversationArr.map(item =>
									<Link
										to={"/chat/" + item._id}
										key={item._id}
									>
										<ListItem
											component="div"
											className={
												"line"
												+ (item.seen ? "" : " unseen")
												+ (item._id === oponentId ? " active" : "")
											}
										>
											<div className="left">
												<div className="avatar">
													<div className="status" />
													<Avatar onClick={e => e.preventDefault()}>
														{(item.name) ? item.name[0] : "UPS"}
													</Avatar>
												</div>
											</div>
											<div className="center">
												<span className="name">
													{item.name || "Nazwa Konwersacji"}
												</span>
												<span className="message">
													{item.lastMessage.content}
												</span>
											</div>
											<div className="right">
												<IconButton className="menu" onClick={this.handleMenuClick} >
													<MoreHoriz style={{ fontSize: "inherit" }} />
												</IconButton>
											</div>
										</ListItem>
									</Link>
								)}
								<Menu
									open={Boolean(menuAnchorEl)}
									onClose={this.handleMenuClose}
									anchorEl={menuAnchorEl}
								>
									<MenuItem className="menuItem" onClick={this.handleMenuClose}>
										{formatMessage({ id: "chat.users.menuItem.delete" })}
									</MenuItem>
								</Menu>
							</div>;
						}}
					</Query>
			}</Query>
		</div>;
	}
}

export default injectIntl(Users);
