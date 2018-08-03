import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';

import Query from 'react-apollo/Query';
import { GET_CONVERSATION, IGetConversationResponse, MESSAGES_SUBSCRIPTION } from './index.apollo';

import '../../../style/inbox.component.scss';

import Header from './header.component';
import MessageList from './message-list.component';
import MessageInput from './MessageInput';
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
				({ loading, error, data, subscribeToMore }) => {
					if (error) {
						if (error.message && error.message.includes('404 (Not Found)')) return <Redirect to='/' push />;
						return <Empty i18nID='error' />;
					}
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
									<MessageList
										messages={messages}
										subscribeToNewMessages={() => subscribeToMore({
											document: MESSAGES_SUBSCRIPTION,
											variables: { conversationId: oponentId },
											updateQuery: (prev, { subscriptionData }) => {
												if (!subscriptionData.data) return prev;
												const messagesArr = prev.getConversation.messages;
												const messageAdded = subscriptionData.data.messageAdded;
												if (!messagesArr.find((msg: any) => msg._id === messageAdded._id))
													return Object.assign({}, prev, {
														getConversation: Object.assign({}, prev.getConversation, {
															messages: [...messagesArr, messageAdded]
														})
													});
											}
										})}
									/>
									<MessageInput draft={draft} oponentId={oponentId} />
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
