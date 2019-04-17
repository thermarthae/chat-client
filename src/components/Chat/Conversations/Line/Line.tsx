import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

import TweTypography from '@src/components/TweTypography/TweTypography';
import lineStyles from './Line.style';

interface ILineProps {
	avatar?: string;
	name: string;
	message?: string;
	isActive?: boolean;
	isUnseen?: boolean;
	handleMenuClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Line = ({ avatar, name, message, isActive, isUnseen, handleMenuClick }: ILineProps) => {
	const classes = lineStyles();
	const [t] = useTranslation();

	return (
		<ListItem
			component='div'
			className={clsx(classes.root, isActive && classes.active, isUnseen && classes.unseen)}
		>
			<div className={classes.left}>
				<div className={classes.avatar}>
					<Avatar>{avatar || ''}</Avatar>
				</div>
			</div>
			<div className={classes.center}>
				<Typography
					className={classes.convName}
					variant='body2'
					children={name || t('chat.conversations.conversationName')}
				/>
				<TweTypography text={message} variant='caption' />
			</div>
			<IconButton className={classes.btn} onClick={handleMenuClick}>
				<MoreHoriz className={classes.btnIcon} />
			</IconButton>
		</ListItem>
	);
};

export default React.memo(Line);

