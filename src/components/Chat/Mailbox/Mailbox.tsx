import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';

import { useApolloClient, useMutation, useQuery } from 'react-apollo-hooks';
import {
	GET_CONVERSATION, IGetConvRes,
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

	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const toggleAside = () => setIsAsideOpen(!isAsideOpen);

	const markAsReadMutation = useMutation<IMarkConvAsReadRes>(MARK_CONV_AS_READ, { variables: { id: oponentId } });
	const markConvAsRead = async () => {
		const res = await markAsReadMutation();
		if (!res.data || !res.data.markConversationAsRead) return;

		const options = { id: oponentId, fragment: ConvNavFragment };
		const conversation = client.readFragment(options)!;
		client.writeFragment({
			...options,
			data: Object.assign(conversation, { seen: true })
		});
	};

	const { loading, error, data, fetchMore } = useQuery<IGetConvRes>(GET_CONVERSATION, {
		variables: { id: oponentId },
		errorPolicy: 'all'
	});

	if (loading) return <Empty i18nID='chat.mailbox.loading' />;
	if (error || !data) {
		if (data && data.getConversation === null) return <Redirect to='/' push />;
		return <Empty i18nID='error.UnknownError' />;
	}

	const { name, messages, draft, seen } = data.getConversation;
	const loadMore = () => fetchMore({
		variables: { skip: messages.length },
		updateQuery: (prev, { fetchMoreResult }) => {
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

	return (
		<div className={classes.root}>
			<Header conversationName={name} toggleAside={toggleAside} />
			<div className={classes.content}>
				<div className={classes.main}>
					<Inbox
						messages={messages}
						seen={seen}
						markConvAsRead={markConvAsRead}
						onLoadMore={loadMore}
					/>
					<MessageInput draft={draft} oponentId={oponentId} />
				</div>
				<Aside open={isAsideOpen} />
			</div>
		</div>
	);
};

export default Mailbox;
