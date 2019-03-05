import React, { useState } from 'react';
import { Translation } from 'react-i18next';
import Query from 'react-apollo/Query';
import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import OptionList from '@src/components/OptionList/OptionList';
import List from './../List';
import Line from '../Line/Line';

import { GET_OPONENT_ID, IGetOponentIdResponse } from './ConversationList.apollo';
import { IConversation } from '../Conversations.apollo';


interface IConversationListProps {
	conversationArr: IConversation[];
}

const ConversationList = ({ conversationArr }: IConversationListProps) => {
	const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | undefined>(undefined);
	const handleMenuClose = () => setMenuAnchorEl(undefined);
	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setMenuAnchorEl(event.currentTarget);
	};

	return (
		<Query<IGetOponentIdResponse> query={GET_OPONENT_ID}>
			{({ data }) => {
				const { chat: { oponentId } } = data!;
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
								<Translation>
									{t => <Typography children={t('optionList.delete')} />}
								</Translation>
							</OptionList>
						</Menu>
					</List>
				);
			}}
		</Query>
	);
};
export default ConversationList;
