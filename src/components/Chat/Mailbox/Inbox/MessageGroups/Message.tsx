import * as React from 'react';
import { parseEmoji } from 'Utils/emoji.utils';

import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';

import { IMessage } from '../../Mailbox.apollo';

interface IMessageProps {
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
	message: IMessage;
}

export default class Message extends React.Component<IMessageProps> {
	public shouldComponentUpdate(nextProps: IMessageProps) {
		if (this.props.message.content !== nextProps.message.content) return true;
		return false;
	}

	public render() {
		const { message, handleMenuClick } = this.props;
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
	}
}
