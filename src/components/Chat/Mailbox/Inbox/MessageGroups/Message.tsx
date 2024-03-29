import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';

import { IMessageMailboxFrag } from '../../Mailbox.apollo';
import TweTypography from '@src/components/TweTypography/TweTypography';
import messageStyles from './Message.style';

interface IMessageProps {
	message: IMessageMailboxFrag;
	me: boolean;
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Message = React.memo(({ message, me, handleMenuClick }: IMessageProps) => {
	const classes = messageStyles();

	return (
		<div className={clsx(classes.root, me && classes.me)}>
			<div className={classes.content}>
				<TweTypography text={message.content} color='inherit' variant='body2' />
			</div>
			<div className={classes.options}>
				<IconButton className={classes.btn} onClick={handleMenuClick}>
					<MoreVert className={classes.ico} />
				</IconButton>
			</div>
			<div className={classes.clear} />
		</div>
	);
},
	(prevProps, nextProps) => {
		if (prevProps.message.content !== nextProps.message.content) return false;
		return true;
	}
);
export default Message;
