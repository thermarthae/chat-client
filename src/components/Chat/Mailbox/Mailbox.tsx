import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';

import { withApollo, WithApolloClient } from 'react-apollo';
import Query from 'react-apollo/Query';
import {
	GET_CONVERSATION, IGetConversationResponse,
	NEW_MESSAGES_SUBSCRIPTION, IMessage,
	GET_MX_SUB_STATUS, IGetMxSubStatusRes, TOGGLE_MX_SUB_STATUS
} from './Mailbox.apollo';

import './Mailbox.style.scss';

import Header from './Header/Header';
import Inbox from './Inbox/Inbox';
import MessageInput from './MessageInput/MessageInput';
import Aside from './Aside/Aside';

const Empty = ({ i18nID }: { i18nID: string }) => {
	return (
		<div id='mailbox'>
			<div className='item--empty align--center empty'>
				<FormattedMessage id={i18nID} />
			</div>
		</div>
	);
};

interface IMailboxProps {
	oponentId?: string;
}

interface IMailboxState {
	mgsToFetch: number;
}

class Mailbox extends React.Component<WithApolloClient<IMailboxProps>, IMailboxState> {
	public state = {
		mgsToFetch: 10
	};

	private subscribe = () => {
		const { client } = this.props;
		const { mgsToFetch } = this.state;
		const { subscriptions } = client.readQuery<IGetMxSubStatusRes>({ query: GET_MX_SUB_STATUS })!;
		if (subscriptions.mailbox) return;

		client.mutate({ mutation: TOGGLE_MX_SUB_STATUS });
		client.subscribe({
			query: NEW_MESSAGES_SUBSCRIPTION
		}).subscribe({
			next(res) {
				try {
					const newMsg = res.data.newMessageAdded as IMessage;
					const variables = { id: newMsg.conversation, skip: 0, limit: mgsToFetch };
					const { getConversation } = client.readQuery({
						query: GET_CONVERSATION,
						variables,
					}) as IGetConversationResponse;

					const msgExists = getConversation.messages.find(msg => msg._id === newMsg._id);
					if (!msgExists) client.writeQuery({
						query: GET_CONVERSATION,
						variables,
						data: {
							getConversation: Object.assign({}, getConversation, {
								messages: [...getConversation.messages, newMsg]
							})
						},
					});
				} catch (error) { } // tslint:disable-line
			},
			error(err) { console.error('Mailbox subscription error:', err); },
		});
	}

	public componentDidMount() {
		this.subscribe();
	}

	public render() {
		const { oponentId } = this.props;
		if (!oponentId) return <Empty i18nID='chat.mailbox.nothingSelected' />;
		const mgsToFetch = 10;
		const variables = { id: oponentId, skip: 0, limit: mgsToFetch };

		return (
			<Query query={GET_CONVERSATION} variables={variables}>{
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
										onLoadMore={() => fetchMore({
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
	}
}

export default withApollo(Mailbox);
