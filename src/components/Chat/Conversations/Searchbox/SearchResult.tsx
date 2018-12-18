import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { IFindConvAndUsrRes } from './Searchbox.apollo';
import ListSubheader from '@material-ui/core/ListSubheader';

import ConversationList from '../ConversationList/ConversationList';
import UserList from '../UserList/UserList';

import EmptyItem from '../EmptyItem';
import List from '../List';


interface ISearchResultProps {
	result: IFindConvAndUsrRes;
}

class SearchResult extends React.PureComponent<ISearchResultProps> {
	public render() {
		const { result } = this.props;
		const { findConversation, findUser } = result as IFindConvAndUsrRes;

		const isConvArr = !!findConversation[0];
		const isUserArr = !!findUser[0];

		if (!isUserArr && !isConvArr) return (
			<EmptyItem>
				<FormattedMessage id={'chat.searchbox.noResults'} />
			</EmptyItem>
		);

		return (
			<List className='search-result'>
				{isUserArr && <>
					<ListSubheader className='subheader'>
						<FormattedMessage id={'chat.searchbox.users'} />
					</ListSubheader>
					<UserList userArr={findUser} />
				</>}
				{isConvArr && <>
					<ListSubheader className='subheader'>
						<FormattedMessage id={'chat.searchbox.conversations'} />
					</ListSubheader>
					<ConversationList conversationArr={findConversation} />
				</>}
			</List>
		);
	}
}

export default SearchResult;
