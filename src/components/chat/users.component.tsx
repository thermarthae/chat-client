import * as React from "react";
import { Link } from "react-router-dom";

import { injectIntl, InjectedIntlProps } from "react-intl";

import { connect } from "react-redux";
import { IChatReducerState, IInbox } from "../../reducers/chat.reducer";
import { TInboxFilter } from "../../actions/chat.actions";

import Avatar from "material-ui/Avatar";
import { ListItem } from "material-ui/List";
import Menu, { MenuItem } from "material-ui/Menu";
import IconButton from "material-ui/IconButton";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Search from "@material-ui/icons/Search";
import Cancel from "@material-ui/icons/Cancel";

import Input from "material-ui/Input";

import "../../style/users.component.scss";

interface IUsersProps extends InjectedIntlProps {
	chat: IChatReducerState;
	oponentId: string;
}

interface IUsersStates {
	menuAnchorEl: HTMLElement | undefined;
}

const filterItem = (item: IInbox, filter: TInboxFilter) => {
	if (filter === null) return true;
	else if (filter === "unread" && !item.lastMessage.seen) return true;
	else if (filter === "draft" && item.draft) return true;
	return false;
};

class Users extends React.PureComponent<IUsersProps, IUsersStates> {
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
		const filteredItems = this.props.chat.inbox.filter((item: IInbox) => filterItem(item, this.props.chat.inboxFilter));

		return (
			<div id="users">
				<div className="head">
					<Input
						classes={{ root: "searchbar" }}
						disableUnderline
						/* value={this.state.password}
						onChange={this.handleChange("password")} */
						placeholder={formatMessage({ id: "chat.users.search" })}
						startAdornment={
							<Search className="btn" />
						}
						endAdornment={
							<IconButton
								className="cancel"
								onClick={e => e.preventDefault()}
								onMouseDown={e => e.preventDefault()}
							>
								<Cancel style={{ fontSize: "inherit" }} />
							</IconButton>
						}
					/>
				</div>
				{!this.props.chat.inbox[0] ?
					<div className="list empty">
						<span>
							{formatMessage({ id: "chat.users.inboxIsEmpty" })}
						</span>
					</div>
					:
					!filteredItems[0] ?
						<div className="list empty">
							<span>
								{formatMessage({ id: "chat.users.nothingToShow" })}
							</span>
						</div>
						:
						<div className="list">
							{filteredItems.map(item =>
								<Link
									to={"/chat/" + item.user.id}
									key={item.lastMessage.id}
								>
									<ListItem
										component="div"
										className={
											"line" +
											(item.user.online ? " online" : "") +
											(item.lastMessage.seen ? "" : " unseen") +
											(item.user.id === oponentId ? " active" : "")
										}
									>
										<div className="left">
											<div className="avatar">
												<div className="status" />
												<Avatar onClick={e => e.preventDefault()}>
													{item.user.name[0] + item.user.surname[0]}
												</Avatar>
											</div>
										</div>
										<div className="center">
											<span className="name">
												{item.user.name + " " + item.user.surname}
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
						</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		chat: state.Chat,
		intl: {}, //TODO
	};
};

export default connect(mapStateToProps)(injectIntl(Users));
