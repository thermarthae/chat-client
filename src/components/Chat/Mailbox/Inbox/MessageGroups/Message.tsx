import * as React from 'react';
import { parseEmoji } from 'Utils/emoji.utils';

import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';

import { IMessage } from '../../Mailbox.apollo';

interface IMessageProps {
	message: IMessage;
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Message = React.memo(({ message, handleMenuClick }: IMessageProps) => {
	const parsedMsg = parseEmoji(message.content);

	return (
		<div className='message'>
			<div className='wrapper'>
				<div className='content'>
					<span dangerouslySetInnerHTML={{ __html: parsedMsg }} />
				</div>
			</div>
			<div className='options'>
				<IconButton className='btn' onClick={handleMenuClick}>
					<MoreVert style={{ fontSize: 'inherit' }} />
				</IconButton>
			</div>
			<div className='clear'></div>
		</div>
	);
},
	(prevProps, nextProps) => {
		if (prevProps.message.content !== nextProps.message.content) return false;
		return true;
	}
);
export default Message;
