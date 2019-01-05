import React from 'react';
import { FormattedMessage } from 'react-intl';
import { parseEmoji } from '@src/utils/emoji.utils';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

import lineStyles from './Line.style';

interface ILineProps {
	avatar?: string;
	name: string;
	message?: string;
	isActive?: boolean;
	isOnline?: boolean;
	isUnseen?: boolean;
	handleMenuClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Line = ({ avatar, name, message, isActive, isUnseen, isOnline, handleMenuClick }: ILineProps) => {
	const classes = lineStyles({});
	const parsedMsg = message ? parseEmoji(message) : '';
	return (
		<ListItem
			component='div'
			className={
				classes.root
				+ (isActive ? ' ' + classes.active : '')
				+ (isUnseen ? ' ' + classes.unseen : '')
			}
		>
			<div className={classes.left}>
				<div className={classes.avatar}>
					{isOnline && <div className={classes.online} />}
					<Avatar>{avatar || ''}</Avatar>
				</div>
			</div>
			<div className={classes.center}>
				<FormattedMessage id='chat.conversations.conversationName' >{
					defaultName => <span className={classes.name}>{name || defaultName}</span>
				}</FormattedMessage>
				{message && <span className={classes.message} dangerouslySetInnerHTML={{ __html: parsedMsg }} />}
			</div>
			<IconButton className={classes.btn} onClick={handleMenuClick}>
				<MoreHoriz className={classes.btnIcon} />
			</IconButton>
		</ListItem>
	);
};
export default Line;
