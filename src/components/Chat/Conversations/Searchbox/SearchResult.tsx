import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { IFindConvAndUsrRes } from './Searchbox.apollo';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Theme } from '@material-ui/core';
import { styled } from '@material-ui/styles';

import ConversationList from '../ConversationList/ConversationList';
import UserList from '../UserList/UserList';
import EmptyItem from '../EmptyItem';
import List from '../List';

const StyledListSubheader = styled(ListSubheader)(({ theme: { palette } }: { theme: Theme }) => ({
	backgroundColor: palette.primary.lighter
}));

interface ISearchResultProps {
	result: IFindConvAndUsrRes;
}
const SearchResult = memo(({ result }: ISearchResultProps) => {
	const { findConversation, findUser } = result as IFindConvAndUsrRes;

	const isConvArr = !!findConversation[0];
	const isUserArr = !!findUser[0];

	if (!isUserArr && !isConvArr) return (
		<EmptyItem>
			<FormattedMessage id={'chat.searchbox.noResults'} />
		</EmptyItem>
	);

	return (
		<List>
			{isUserArr && <>
				<StyledListSubheader>
					<FormattedMessage id={'chat.searchbox.users'} />
				</StyledListSubheader>
				<UserList userArr={findUser} />
			</>}
			{isConvArr && <>
				<StyledListSubheader>
					<FormattedMessage id={'chat.searchbox.conversations'} />
				</StyledListSubheader>
				<ConversationList conversationArr={findConversation} />
			</>}
		</List>
	);
});

export default SearchResult;
