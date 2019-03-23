import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import OptionList from '@src/components/OptionList/OptionList';
import List from './../List';
import Line from '../Line/Line';

import { GET_OPONENT_ID, IGetOponentIdResponse } from './ConversationList.apollo';
import { IConvNavFragment } from '../Conversations.apollo';


interface IConversationListProps {
	conversationArr: IConvNavFragment[];
}

const ConversationList = ({ conversationArr }: IConversationListProps) => {
	const [t] = useTranslation();
	const { data } = useQuery<IGetOponentIdResponse>(GET_OPONENT_ID);
	const { chat: { oponentId } } = data!;

	const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | undefined>(undefined);
	const handleMenuClose = () => setMenuAnchorEl(undefined);
	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setMenuAnchorEl(event.currentTarget);
	};

	return (
		<List>
			{conversationArr.map(item =>
				<Link to={'/chat/' + item._id} key={item._id}>
					<Line
						avatar={item.name[0]}
						name={item.name}
						message={item.messages[0].content}
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
