import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { IFindConvAndUsrRes } from './Searchbox.apollo';
import ListSubheader from '@material-ui/core/ListSubheader';

import ConversationList from '../ConversationList/ConversationList';
import UserList from '../UserList/UserList';

import EmptyItem from '../EmptyItem';


interface ISearchboxProps {
	result: IFindConvAndUsrRes;
	oponentId?: string;
}

class Searchbox extends React.PureComponent<ISearchboxProps> {
	public render() {
		const { result, oponentId } = this.props;
		const { findConversation, findUser } = result as IFindConvAndUsrRes;

		const isConvArr = !!findConversation[0];
		const isUserArr = !!findUser[0];

		if (!isUserArr && !isConvArr) return (
			<EmptyItem>
				<FormattedMessage id={'chat.searchbox.noResults'} />
			</EmptyItem>
		);

		return (
			<div className='list search-result'>
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
					<ConversationList oponentId={oponentId} conversationArr={findConversation} />
				</>}
			</div>
		);
	}
}

export default Searchbox;