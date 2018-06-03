import * as React from "react";
import { FormattedRelative } from "react-intl";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import MoreVert from "@material-ui/icons/MoreVert";

import { IMessage } from "./index.apollo";

interface IMessageItemProps {
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
	message: IMessage;
}

const MessageItem: React.SFC<IMessageItemProps> = props => {
	const { message } = props;
	return (
		<div
			className={
				"messageItem"
				+ (message.me ? " me" : "")
			}
		>
			{!message.me && <div className="author">
				<Avatar>{message.authorName[0]}</Avatar>
			</div>}
			<div className="wrapper">
				<div className="content">
					<span>{message.content}</span>
				</div>
				<div className="time">
					<FormattedRelative value={parseInt(message.time, 10)} />
				</div>
			</div>
			<div className="options">
				<IconButton className="btn" onClick={props.handleMenuClick}>
					<MoreVert style={{ fontSize: "inherit" }} />
				</IconButton>
			</div>
		</div>
	);
};

export default MessageItem;
