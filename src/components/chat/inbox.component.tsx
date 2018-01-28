import * as React from "react";
import { FormattedMessage, FormattedRelative, injectIntl, InjectedIntlProps } from "react-intl";
import { connect, Dispatch } from "react-redux";
import { IChatAction, ChatActions } from "../../actions/chat.actions";
import { IChatReducerState, IInbox } from "../../reducers/chat.reducer";

import Avatar from "material-ui/Avatar";
import TextField from "material-ui/TextField";
import ButtonBase from "material-ui/ButtonBase";
import IconButton from "material-ui/IconButton";
import MoreVert from "material-ui-icons/MoreVert";
import Send from "material-ui-icons/Send";
import InsertEmoticon from "material-ui-icons/InsertEmoticon";
import Settings from "material-ui-icons/Settings";

import "../../style/inbox.component.scss";

interface IInboxProps extends InjectedIntlProps {
	chat: IChatReducerState;
	toggleAside: () => IChatAction;
	oponentId: string;
}

const EmptyInbox = (message: string) => {
	return (
		<div id="inbox">
			<div className="middle empty">
				{message}
			</div>
		</div>
	);
};

const Inbox = (props: IInboxProps) => {
	const currentChat = (props.chat.inbox as IInbox[]).find(
		oneInbox => oneInbox.user.id === props.oponentId
	);

	if (!currentChat) return EmptyInbox(
		props.intl.formatMessage({
			id: "chat.inbox.nothingSelected",
			defaultMessage: "Nothing is selected..."
		})
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
							{props.intl.formatMessage({
								id: "chat.inbox.isTyping",
								defaultMessage: " is typing..."
							})}
						</span>}
				</div>
				<ButtonBase
					focusRipple
					className="btn btn-big"
					onClick={props.toggleAside}
				>
					<Settings style={{ fontSize: "inherit" }}/>
				</ButtonBase>
			</div>
			<div className="middle">
				{currentChat.messages.map(item => (
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
								{item.seen && <FormattedMessage id="chat.inbox.seen" defaultMessage="Seen, " />}
								<FormattedRelative value={item.time}/>
							</div>
						</div>
						<div className="options">
							<IconButton className="btn">
								<MoreVert style={{ fontSize: "inherit" }}/>
							</IconButton>
						</div>
					</div>
				))}
			</div>
			<div className="bottom">
				<TextField
					className="input"
					placeholder={props.intl.formatMessage({
						id: "chat.inbox.typeYourMessage",
						defaultMessage: "Type your message..."
					})}
					multiline
					rowsMax={3}
					InputProps={{
						disableUnderline: true
					}}
				/>
				<IconButton className="btn emoticon">
					<InsertEmoticon style={{ fontSize: "inherit" }}/>
				</IconButton>
				<IconButton className="btn send">
					<Send style={{ fontSize: "inherit" }}/>
				</IconButton>
			</div>
		</div>
	);
};
// class Inbox extends React.PureComponent<IInboxProps>  {
// 	public render() {
// 		// const currentChat = (this.props.chat.inbox as IInbox[]).find(
// 		// 	oneInbox => oneInbox.user.id === this.props.oponentId
// 		// );
// 		const currentChat = (this.props.chat.inbox as IInbox[]).find(
// 			oneInbox => oneInbox.user.id === this.props.oponentId
// 		);
//
// 		if (!currentChat) return EmptyInbox(
// 			this.props.intl.formatMessage({
// 				id: "chat.inbox.nothingSelected",
// 				defaultMessage: "Nothing is selected..."
// 			})
// 		);
// 		return (
// 			<div id="inbox">
// 				<div className="head">
// 					<div className="id">
// 						<span className="name">
// 							{currentChat.user.name + " " + currentChat.user.surname}
// 						</span>
// 						{currentChat.user.isTypping &&
// 							<span className="typing">
// 								{this.props.intl.formatMessage({
// 									id: "chat.inbox.isTyping",
// 									defaultMessage: " iss typing..."
// 								})}
// 							</span>}
// 					</div>
// 					<ButtonBase
// 						focusRipple
// 						className="btn btn-big"
// 						onClick={this.props.toggleAside}
// 					>
// 						<Settings />
// 					</ButtonBase>
// 				</div>
// 				<div className="middle">
// 					{currentChat.messages.map(item => (
// 						<div
// 							className={
// 								"message" +
// 								(item.me ? " me" : "") +
// 								(item.seen ? " seen" : "")
// 							}
// 							key={item.time}
// 						>
// 							{!item.me && (
// 								<div className="author">
// 									<Avatar>
// 										{currentChat.user.name[0] +
// 											currentChat.user.surname[0]}
// 									</Avatar>
// 								</div>
// 							)}
// 							<div className="wrapper">
// 								<div className="content">
// 									<span>{item.content}</span>
// 								</div>
// 								<div className="time">
// 									{item.seen && <FormattedMessage id="chat.inbox.seen" defaultMessage="Seen, " />}
// 									<FormattedRelative value={item.time} />
// 								</div>
// 							</div>
// 							<div className="options">
// 								<IconButton className="btn">
// 									<MoreVert />
// 								</IconButton>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 				<div className="bottom">
// 					<TextField
// 						className="input"
// 						placeholder={this.props.intl.formatMessage({
// 							id: "chat.inbox.typeYourMessage",
// 							defaultMessage: "Type your message..."
// 						})}
// 						multiline
// 						rowsMax={3}
// 						InputProps={{
// 							disableUnderline: true
// 						}}
// 					/>
// 					<IconButton className="btn emoticon">
// 						<InsertEmoticon />
// 					</IconButton>
// 					<IconButton className="btn send">
// 						<Send />
// 					</IconButton>
// 				</div>
// 			</div>
// 		);
// 	}
// }

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
