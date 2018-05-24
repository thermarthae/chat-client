import * as React from "react";
import { FormattedMessage, FormattedRelative, injectIntl, InjectedIntlProps } from "react-intl";

import { ApolloClient } from "apollo-boost";
import { withApollo, Query } from "react-apollo";
import { WithApolloClient } from "react-apollo/withApollo";
import {
	TOGGLE_ASIDE, GET_ASIDE_STATUS,
	GET_CONVERSATION, IGetConversationResponse,
} from "../../apollo/chat/inbox.apollo";

import { Avatar, TextField, ButtonBase, IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert, Send, InsertEmoticon, Settings } from "@material-ui/icons";

import "../../style/inbox.component.scss";

interface IInboxProps {
	oponentId?: string;
}

interface IInboxStates {
	menuAnchorEl: HTMLElement | undefined;
}

const EmptyInbox = () => {
	return <div id="inbox">
		<div className="empty">
			<FormattedMessage id="chat.inbox.nothingSelected" />
		</div>
	</div>;
};

class Inbox extends React.PureComponent<WithApolloClient<IInboxProps & InjectedIntlProps>, IInboxStates> {
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

	public handleAsideToggle = async (client: ApolloClient<any>) => {
		await client.mutate({
			mutation: TOGGLE_ASIDE,
		});
	}

	public render() {
		const { intl: { formatMessage }, oponentId } = this.props;
		const { menuAnchorEl } = this.state;

		return (
			!oponentId ? <EmptyInbox /> :
				<Query query={GET_CONVERSATION} variables={{ id: oponentId }}>{
					({ loading, error, data }) => {
						if (error) return `Error! ${error.message}`;
						if (loading) return "Loading...";
						if (!data) return <EmptyInbox />;

						const {
							getConversation: {
								name,
								messages,
								draft
							}
						}: IGetConversationResponse = data;

						return <div id="inbox">
							<div className="head">
								<div className="id">
									<span className="name">{name}</span>
									{/* {currentChat.user.isTypping && //TODO
									<span className="typing">
										<FormattedMessage id="chat.inbox.isTyping"/>
									</span>} */}
								</div>
								<ButtonBase
									focusRipple
									className="btn btn-big"
									onClick={() => this.handleAsideToggle(this.props.client)}
								>
									<Settings style={{ fontSize: "inherit" }} />
								</ButtonBase>
							</div>
							<div className="content">
								<div className="main">
									<div className="top">
										{messages.map(item =>
											<div
												key={item._id}
												className={
													"message"
													+ (item.me ? " me" : "")
												}
											>
												{!item.me && <div className="author">
													<Avatar>{item.authorName[0]}</Avatar>
												</div>}
												<div className="wrapper">
													<div className="content">
														<span>{item.content}</span>
													</div>
													<div className="time">
														<FormattedRelative value={parseInt(item.time, 10)} />
													</div>
												</div>
												<div className="options">
													<IconButton className="btn" onClick={this.handleMenuClick}>
														<MoreVert style={{ fontSize: "inherit" }} />
													</IconButton>
												</div>
											</div>
										)}
										<Menu
											open={Boolean(menuAnchorEl)}
											onClose={this.handleMenuClose}
											anchorEl={menuAnchorEl}
										>
											<MenuItem className="menuItem" onClick={this.handleMenuClose}>
												<FormattedMessage id="chat.inbox.menuItem.delete" />
											</MenuItem>
										</Menu>
									</div>

									<div className="bottom">
										<TextField
											className="input"
											placeholder={formatMessage({ id: "chat.inbox.typeYourMessage" })}
											multiline
											rowsMax={3}
											InputProps={{ disableUnderline: true }}
											value={draft.content}
										/>
										<IconButton className="btn emoticon">
											<InsertEmoticon style={{ fontSize: "inherit" }} />
										</IconButton>
										<IconButton className="btn send">
											<Send style={{ fontSize: "inherit" }} />
										</IconButton>
									</div>
								</div>
								<Query query={GET_ASIDE_STATUS}>{
									({ data: { chat: { isAsideOpen } } }) =>
										<div className={"aside" + (isAsideOpen ? " active" : "")}></div>
								}</Query>
							</div>
						</div>;
					}
				}</Query>
		);
	}
}

export default injectIntl(withApollo(Inbox));
