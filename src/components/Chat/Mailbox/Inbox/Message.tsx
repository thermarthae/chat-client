import * as React from 'react';
import { parseEmoji } from 'Utils/emoji.utils';

import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';

import { IMessage } from '../Mailbox.apollo';

interface IMessageItemProps {
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
	message: IMessage;
}

const MessageItem: React.SFC<IMessageItemProps> = props => {
	const { message } = props;
	const parsedMsg = parseEmoji(message.content);

	return (
		<div className='message'>
			<div className='wrapper'>
				<div className='content'>
					<span dangerouslySetInnerHTML={{ __html: parsedMsg }} />
				</div>
			</div>
			<div className='options'>
				<IconButton className='btn' onClick={props.handleMenuClick}>
					<MoreVert style={{ fontSize: 'inherit' }} />
				</IconButton>
			</div>
			<div className='clear'></div>
		</div>
	);
};

export default MessageItem;
