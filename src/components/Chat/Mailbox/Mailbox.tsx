import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';

import Query from 'react-apollo/Query';
import {
	GET_CONVERSATION, IGetConversationResponse
} from './Mailbox.apollo';

import './Mailbox.style.scss';

import Header from './Header/Header';
import Inbox from './Inbox/Inbox';
import MessageInput from './MessageInput/MessageInput';
import Aside from './Aside/Aside';

interface IMailboxProps {
	oponentId?: string;
}

const Empty = ({ i18nID }: { i18nID: string }) => {
	return (
		<div id='mailbox'>
			<div className='item--empty align--center empty'>
				<FormattedMessage id={i18nID} />
			</div>
		</div>
	);
};

const Mailbox: React.SFC<IMailboxProps> = props => {
	const { oponentId } = props;
	const mgsToFetch = 10;

	return (
		!oponentId ? <Empty i18nID='chat.mailbox.nothingSelected' /> :
			<Query query={GET_CONVERSATION} variables={{ id: oponentId, skip: 0, limit: mgsToFetch }}>{
				({ loading, error, data, fetchMore }) => {
					if (error) {
						if (error.message && error.message.includes('404 (Not Found)')) return <Redirect to='/' push />;
						return <Empty i18nID='error.unknown' />;
					}
					if (loading) return <Empty i18nID='chat.mailbox.loading' />;
					if (!data) return <Empty i18nID='chat.mailbox.nothingSelected' />;

					const {
						getConversation: {
							name,
							messages,
							draft,
						}
					}: IGetConversationResponse = data;

					return (
						<div id='mailbox'>
							<Header conversationName={name} />
							<div className='content'>
								<div className='main'>
									<Inbox
										messages={messages}
										mgsToFetch={mgsToFetch}
										onLoadMore={() =>
											fetchMore({
												variables: { skip: messages.length },
												updateQuery: (prev: IGetConversationResponse, { fetchMoreResult }) => {
													if (!fetchMoreResult || !fetchMoreResult.getConversation.messages)
														return prev;

													return {
														getConversation: Object.assign({}, prev.getConversation, {
															messages: [
																...fetchMoreResult.getConversation.messages,
																...prev.getConversation.messages,
															]
														})
													};
												}
											})
										}
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

export default Mailbox;
