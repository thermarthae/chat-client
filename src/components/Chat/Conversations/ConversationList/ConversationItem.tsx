import * as React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { parseEmoji } from 'Utils/emoji.utils';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';

import MoreHoriz from '@material-ui/icons/MoreHoriz';

import { IConversation } from '../Conversations.apollo';

interface IConversationItemProps {
	handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
	conversation: IConversation;
	currentConv: boolean;
	lastMsgId: string;
}
class ConversationItem extends React.Component<IConversationItemProps & InjectedIntlProps> {
	public shouldComponentUpdate(nextProps: IConversationItemProps) {
		if (this.props.currentConv !== nextProps.currentConv) return true;
		if (this.props.lastMsgId !== nextProps.lastMsgId) return true;
		return false;
	}

	public render() {
		const { conversation, currentConv, handleMenuClick, intl: { formatMessage } } = this.props;
		const parsedMsg = parseEmoji(conversation.messages[0].content);

		return (
			<Link to={'/chat/' + conversation._id}>
				<ListItem
					component='div'
					className={
						'line'
						+ (conversation.seen ? '' : ' unseen')
						+ (currentConv ? ' active' : '')
					}
				>
					<div className='left'>
						<div className='avatar'>
							<div className='status' />
							<Avatar>
								{conversation.name[0] || ''}
							</Avatar>
						</div>
					</div>
					<div className='center'>
						<span className='name'>
							{conversation.name || formatMessage({ id: 'chat.conversations.conversationName' })}
						</span>
						<span className='message' dangerouslySetInnerHTML={{ __html: parsedMsg }} />
					</div>
					<div className='right'>
						<IconButton className='menu' onClick={handleMenuClick} >
							<MoreHoriz style={{ fontSize: 'inherit' }} />
						</IconButton>
					</div>
				</ListItem>
			</Link>
		);
	}
}

export default injectIntl(ConversationItem);
