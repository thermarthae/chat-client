import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';

import { useApolloClient } from 'react-apollo-hooks';
import Query from 'react-apollo/Query';
import {
	GET_CONVERSATION, IGetConversationResponse,
	MARK_CONV_AS_READ, IMarkConvAsReadRes
} from './Mailbox.apollo';
import { ConvNavFragment } from '@src/components/Chat/Conversations/Conversations.apollo';

import mailboxStyles from './Mailbox.style';

import Header from './Header/Header';
import Inbox from './Inbox/Inbox';
import MessageInput from './MessageInput/MessageInput';
import Aside from './Aside/Aside';

const Empty = ({ i18nID }: { i18nID: string; }) => {
	const classes = mailboxStyles(); //TODO: Move to separate file
	const [t] = useTranslation();
	return (
		<div className={classes.root}>
			<Typography className={classes.empty} variant='h3' align='center' children={t(i18nID)} />
		</div>
	);
};

interface IMailboxProps {
	oponentId?: string;
}

const Mailbox = ({ oponentId }: IMailboxProps) => {
	if (!oponentId) return <Empty i18nID='chat.mailbox.nothingSelected' />;

	const classes = mailboxStyles();
	const client = useApolloClient();
	const mgsToFetch = 10; //TODO: Remove soon
	const variables = { id: oponentId, skip: 0, limit: mgsToFetch };

	const markConvAsRead = async () => {
		const { data: { markConversationAsRead } } = await client.mutate({
			mutation: MARK_CONV_AS_READ,
			variables: { id: oponentId }
		}) as IMarkConvAsReadRes;

		if (!markConversationAsRead) return;
		const getConversation = client.readFragment({
			id: oponentId!,
			fragment: ConvNavFragment,
		})!;

		client.writeFragment({
			id: oponentId!,
			fragment: ConvNavFragment,
			data: Object.assign(getConversation, { seen: true })
		});
		client.queryManager!.broadcastQueries();
	};

	return (
		<Query query={GET_CONVERSATION} variables={variables} errorPolicy='all'>
			{({ loading, error, data, fetchMore }) => {
				if (loading) return <Empty i18nID='chat.mailbox.loading' />;
				if (!data) return <Empty i18nID='chat.mailbox.nothingSelected' />;

				const { getConversation }: IGetConversationResponse = data;
				if (error) {
					if (getConversation === null) return <Redirect to='/' push />;
					return <Empty i18nID='error.UnknownError' />;
				}
				const { name, messages, draft, seen } = getConversation;

				const loadMore = () => fetchMore({
					variables: { skip: messages.length },
					updateQuery: (prev: IGetConversationResponse, { fetchMoreResult }) => {
						if (!fetchMoreResult || !fetchMoreResult.getConversation.messages) return prev;
						return {
							getConversation: Object.assign({}, prev.getConversation, {
								messages: [
									...fetchMoreResult.getConversation.messages,
									...prev.getConversation.messages,
								]
							})
						};
					}
				});

				return <div className={classes.root}>
					<Header conversationName={name} />
					<div className={classes.content}>
						<div className={classes.main}>
							<Inbox
								messages={messages}
								seen={seen}
								mgsToFetch={mgsToFetch}
								markConvAsRead={markConvAsRead}
								onLoadMore={loadMore}
							/>
							<MessageInput draft={draft} />
						</div>
						<Aside />
					</div>
				</div>;
			}}
		</Query>
	);
};

export default Mailbox;
