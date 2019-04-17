import React, { useState, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import OptionList from '@src/components/OptionList/OptionList';
import List from './../List';
import Line from '../Line/Line';

import ChatOponentIDCtx from '@src/context/ChatOponentID';
import { IConvMailboxFrag } from '../../Mailbox/Mailbox.apollo';


interface IConversationListProps {
	conversationArr: IConvMailboxFrag[];
}

const ConversationList = ({ conversationArr }: IConversationListProps) => {
	const [t] = useTranslation();
	const oponentId = useContext(ChatOponentIDCtx);

	const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | undefined>(undefined);
	const handleMenuClose = () => setMenuAnchorEl(undefined);
	const handleMenuClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setMenuAnchorEl(event.currentTarget);
	}, []);

	return (
		<List>
			{conversationArr.map(item =>
				<Link to={'/chat/' + item._id} key={item._id}>
					<Line
						avatar={item.name[0]}
						name={item.name}
						message={item.messageFeed.node[item.messageFeed.node.length - 1].content}
						isActive={item._id === oponentId}
						isUnseen={!item.seen}
						handleMenuClick={handleMenuClick}
					/>
				</Link>
			)}
			<Menu
				open={Boolean(menuAnchorEl)}
				onClose={handleMenuClose}
				anchorEl={menuAnchorEl}
			>
				<OptionList onClick={handleMenuClose}>
					<Typography children={t('optionList.delete')} />
				</OptionList>
			</Menu>
		</List>
	);
};
export default ConversationList;
