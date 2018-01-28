import * as React from "react";
import { Link } from "react-router-dom";

import { injectIntl, InjectedIntlProps } from "react-intl";

import { connect } from "react-redux";
import { IChatReducerState, IInbox } from "../../reducers/chat.reducer";
import { TInboxFilter } from "../../actions/chat.actions";

import Avatar from "material-ui/Avatar";
import { ListItem } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import MoreHoriz from "material-ui-icons/MoreHoriz";
import Search from "material-ui-icons/Search";
import Cancel from "material-ui-icons/Cancel";

import Input from "material-ui/Input";

import "../../style/users.component.scss";

interface IUsersProps extends InjectedIntlProps {
	chat: IChatReducerState;
}

const filterItem = (item: IInbox, filter: TInboxFilter) => {
	if (filter === null) return true;
	else if (filter === "unread" && !item.lastMessage.seen) return true;
	else if (filter === "draft" && item.draft) return true;
	return false;
};

const Users = (props: IUsersProps) => {
	const filteredItems = props.chat.inbox.filter((item: IInbox) => filterItem(item, props.chat.inboxFilter));
	return (
		<div id="users">
			<div className="head">
				{/* <div className="searchbar">
					<Search className="btn"/>
					<input placeholder={props.intl.formatMessage({ id: "chat.users.search", defaultMessage: "Search..." })} />
				</div> */}

				<Input
					classes={{ root: "searchbar" }}
					disableUnderline
					/* value={this.state.password}
					onChange={this.handleChange("password")} */
					placeholder={props.intl.formatMessage({
						id: "chat.users.search",
						defaultMessage: "Search..."
					})}
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
			{!props.chat.inbox[0] ?
				<div className="list empty">
					<span>{props.intl.formatMessage({ id: "chat.users.inboxIsEmpty", defaultMessage: "Inbox is empty..." })}</span>
				</div>
				:
				!filteredItems[0] ?
					<div className="list empty">
						<span>{props.intl.formatMessage({ id: "chat.users.nothingToShow", defaultMessage: "Nothing to show..." })}</span>
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
										(item.lastMessage.seen ? "" : " unseen")
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
										<IconButton className="menu" onClick={e => e.preventDefault()}>
											<MoreHoriz style={{ fontSize: "inherit" }} />
										</IconButton>
									</div>
								</ListItem>
							</Link>
						)}
					</div>
			}
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		chat: state.Chat,
		//TODO
		intl: {},
	};
};

export default connect(mapStateToProps)(injectIntl(Users));
