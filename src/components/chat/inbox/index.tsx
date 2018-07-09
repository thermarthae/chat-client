import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Query from 'react-apollo/Query';
import { GET_CONVERSATION, IGetConversationResponse } from './index.apollo';

import '../../../style/inbox.component.scss';

import Header from './header.component';
import MessageList from './message-list.component';
import Input from './input.component';
import Aside from './aside.component';

interface IInboxProps {
	oponentId?: string;
}

const Empty = ({ i18nID }: { i18nID: string }) => {
	return (
		<div id='inbox'>
			<div className='empty'>
				<FormattedMessage id={i18nID} />
			</div>
		</div>
	);
};

const Inbox: React.SFC<IInboxProps> = props => {
	const { oponentId } = props;

	return (
		!oponentId ? <Empty i18nID='chat.inbox.nothingSelected' /> :
			<Query query={GET_CONVERSATION} variables={{ id: oponentId }}>{
				({ loading, error, data }) => {
					if (error) return (
						<div id='inbox'>
							<div className='empty'>{error.message ? error.message : 'Error'}</div>
						</div>
					);

					if (loading) return <Empty i18nID='chat.inbox.loading' />;
					if (!data) return <Empty i18nID='chat.inbox.nothingSelected' />;

					const {
						getConversation: {
							name,
							messages,
							draft,
						}
					}: IGetConversationResponse = data;

					return (
						<div id='inbox'>
							<Header conversationName={name} />
							<div className='content'>
								<div className='main'>
									<MessageList messages={messages} />
									<Input draft={draft} />
								</div>
								<Aside />
							</div>
						</div>
					);
				}
			}</Query>
	);
};

export default Inbox;
