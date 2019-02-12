import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { IFindConvAndUsrRes } from './Searchbox.apollo';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Theme } from '@material-ui/core';
import { styled } from '@material-ui/styles';

import ConversationList from '../ConversationList/ConversationList';
import UserList from '../UserList/UserList';
import EmptyItem from '../../EmptyItem/EmptyItem';
import List from '../List';

const StyledListSubheader = styled(ListSubheader)(({ theme: { palette } }: { theme: Theme }) => ({
	backgroundColor: palette.primary.lighter
}));

interface ISearchResultProps {
	result: IFindConvAndUsrRes;
}
const SearchResult = memo(({ result }: ISearchResultProps) => {
	const { findConversation, findUser } = result as IFindConvAndUsrRes;
	const [t] = useTranslation();

	const isConvArr = !!findConversation[0];
	const isUserArr = !!findUser[0];
	if (!isUserArr && !isConvArr) return <EmptyItem msg={t('chat.searchbox.noResults')} />;

	return (
		<List>
			{isUserArr && <>
				<StyledListSubheader children={t('chat.searchbox.users')} />
				<UserList userArr={findUser} />
			</>}
			{isConvArr && <>
				<StyledListSubheader children={t('chat.searchbox.conversations')} />
				<ConversationList conversationArr={findConversation} />
			</>}
		</List>
	);
});

export default SearchResult;
