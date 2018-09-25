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
	oponentId: string;
}

const ConversationItem: React.SFC<IConversationItemProps & InjectedIntlProps> = props => {
	const { conversation, oponentId, intl: { formatMessage } } = props;
	const parsedMsg = parseEmoji(conversation.messages[0].content);

	return (
		<Link to={'/chat/' + conversation._id}>
			<ListItem
				component='div'
				className={
					'line'
					+ (conversation.seen ? '' : ' unseen')
					+ (conversation._id === oponentId ? ' active' : '')
				}
			>
				<div className='left'>
					<div className='avatar'>
						<div className='status' />
						<Avatar onClick={e => e.preventDefault()}>
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
					<IconButton className='menu' onClick={props.handleMenuClick} >
						<MoreHoriz style={{ fontSize: 'inherit' }} />
					</IconButton>
				</div>
			</ListItem>
		</Link>
	);
};

export default injectIntl(ConversationItem);
