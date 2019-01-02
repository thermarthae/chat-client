import React from 'react';
import { parseEmoji } from 'Utils/emoji.utils';

import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';

import { IMessage } from '../../Mailbox.apollo';
import messageStyles from './Message.style';

interface IMessageProps {
	message: IMessage;
	me: boolean;
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Message = React.memo(({ message, me, handleMenuClick }: IMessageProps) => {
	const parsedMsg = parseEmoji(message.content);
	const classes = messageStyles({});

	return (
		<div className={classes.root + (me ? ' ' + classes.me : '')}>
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<span dangerouslySetInnerHTML={{ __html: parsedMsg }} />
				</div>
			</div>
			<div className={classes.options}>
				<IconButton className={classes.btn} onClick={handleMenuClick}>
					<MoreVert className={classes.ico} />
				</IconButton>
			</div>
			<div className={classes.clear}></div>
		</div>
	);
},
	(prevProps, nextProps) => {
		if (prevProps.message.content !== nextProps.message.content) return false;
		return true;
	}
);
export default Message;
