import * as React from "react";
import { FormattedMessage, FormattedRelative, injectIntl, InjectedIntlProps } from "react-intl";
import { connect, Dispatch } from "react-redux";
import { IChatAction, ChatActions } from "../../actions/chat.actions";
import { IChatReducerState, IInbox } from "../../reducers/chat.reducer";

import Avatar from "material-ui/Avatar";
import TextField from "material-ui/TextField";
import ButtonBase from "material-ui/ButtonBase";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import Send from "@material-ui/icons/Send";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import Settings from "@material-ui/icons/Settings";

import "../../style/inbox.component.scss";

interface IInboxProps extends InjectedIntlProps {
	chat: IChatReducerState;
	toggleAside: () => IChatAction;
	oponentId: string;
}

interface IInboxStates {
	menuAnchorEl: HTMLElement | undefined;
}

const EmptyInbox = (message: string) => {
	return (
		<div id="inbox">
			<div className="empty">
				{message}
			</div>
		</div>
	);
};


class Inbox extends React.PureComponent<IInboxProps, IInboxStates> {
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
		const { chat: { asideIsOpen }, intl: { formatMessage } } = this.props;
		const { menuAnchorEl } = this.state;
		const currentChat = (this.props.chat.inbox as IInbox[]).find(
			oneInbox => oneInbox.user.id === this.props.oponentId
		);

		if (!currentChat) return EmptyInbox(
			formatMessage({ id: "chat.inbox.nothingSelected" })
		);
		return (
			<div id="inbox">
				<div className="head">
					<div className="id">
						<span className="name">
							{currentChat.user.name + " " + currentChat.user.surname}
						</span>
						{currentChat.user.isTypping &&
							<span className="typing">
								{formatMessage({ id: "chat.inbox.isTyping" })}
							</span>}
					</div>
					<ButtonBase
						focusRipple
						className="btn btn-big"
						onClick={this.props.toggleAside}
					>
						<Settings style={{ fontSize: "inherit" }} />
					</ButtonBase>
				</div>
				<div className="content">
					<div className="left">
						<div className="top">
							{currentChat.messages.map(item =>
								<div
									className={
										"message" +
										(item.me ? " me" : "") +
										(item.seen ? " seen" : "")
									}
									key={item.time}
								>
									{!item.me && (
										<div className="author">
											<Avatar>
												{currentChat.user.name[0] +
													currentChat.user.surname[0]}
											</Avatar>
										</div>
									)}
									<div className="wrapper">
										<div className="content">
											<span>{item.content}</span>
										</div>
										<div className="time">
											{item.seen && <FormattedMessage id="chat.inbox.seen" />}
											<FormattedRelative value={item.time} />
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
									{formatMessage({ id: "chat.inbox.menuItem.delete" })}
								</MenuItem>
							</Menu>
						</div>

						<div className="bottom">
							<TextField
								className="input"
								placeholder={formatMessage({ id: "chat.inbox.typeYourMessage" })}
								multiline
								rowsMax={3}
								InputProps={{
									disableUnderline: true
								}}
							/>
							<IconButton className="btn emoticon">
								<InsertEmoticon style={{ fontSize: "inherit" }} />
							</IconButton>
							<IconButton className="btn send">
								<Send style={{ fontSize: "inherit" }} />
							</IconButton>
						</div>
					</div>
					<div className={"right" + (asideIsOpen ? " active" : "")}></div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		chat: state.Chat,
		//TODO
		intl: {},
	};
};

const mapDispatchToProps = (dispatch: Dispatch<IChatAction>) => {
	return {
		toggleAside: () => dispatch(ChatActions.toggleAside()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Inbox));
