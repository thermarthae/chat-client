import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';

import { useMutation, useQuery } from 'react-apollo-hooks';
import {
	GET_CONVERSATION, IGetConvRes,
	MARK_CONV_AS_READ, IMarkConvAsReadRes,
	ConvMailboxFragment, IConvMailboxFrag
} from './Mailbox.apollo';

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

	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const toggleAside = () => setIsAsideOpen(!isAsideOpen);

	const markAsReadMutation = useMutation<IMarkConvAsReadRes>(MARK_CONV_AS_READ, {
		variables: { id: oponentId },
		update: (proxy, res) => {
			if (!res.data || !res.data.markConversationAsRead) return;

			const options = { id: oponentId, fragment: ConvMailboxFragment, fragmentName: 'ConversationMailbox' };
			const conversation = proxy.readFragment<IConvMailboxFrag>(options)!;
			proxy.writeFragment({
				...options,
				data: Object.assign(conversation, { seen: true })
			});
		},
	});
	const markConvAsRead = async () => {
		await markAsReadMutation();
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

	const { name, messageFeed: { node, noMore, cursor }, draft, seen } = data.getConversation;
	const loadMore = () => fetchMore({
		variables: { cursor },
		updateQuery: (prev, { fetchMoreResult }) => {
			if (!fetchMoreResult || !fetchMoreResult.getConversation.messageFeed) return prev;
			const oldMsgs = prev.getConversation.messageFeed.node;
			const { messageFeed } = fetchMoreResult.getConversation;
			return {
				getConversation: Object.assign({}, prev.getConversation, {
					messageFeed: {
						...messageFeed,
						node: [...messageFeed.node, ...oldMsgs]
					}
				})
			};
		}
	});

	return ( //TODO: fix memo args
		<div className={classes.root}>
			<Header conversationName={name} toggleAside={toggleAside} />
			<div className={classes.content}>
				<div className={classes.main}>
					<Inbox
						messages={node}
						noMoreToFetch={noMore}
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
