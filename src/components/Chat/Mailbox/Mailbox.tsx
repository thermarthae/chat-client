import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import { withApollo, WithApolloClient } from 'react-apollo';
import Query from 'react-apollo/Query';
import {
	GET_CONVERSATION, IGetConversationResponse,
	MARK_CONV_AS_READ, IMarkConvAsReadRes
} from './Mailbox.apollo';
import { ConvNavFragment } from '@src/components/Chat/Conversations/Conversations.apollo';

import mailboxStyles, { TMailboxStyles } from './Mailbox.style';

import Header from './Header/Header';
import Inbox from './Inbox/Inbox';
import MessageInput from './MessageInput/MessageInput';
import Aside from './Aside/Aside';

const Empty = ({ i18nID, classes }: { i18nID: string; } & TMailboxStyles) => {
	const [t] = useTranslation();
	return (
		<div className={classes.root}>
			<Typography className={classes.empty} variant='h3' align='center' children={t(i18nID)} />
		</div>
	);
};

interface IMailboxProps extends TMailboxStyles {
	oponentId?: string;
}
interface IMailboxState { }

class Mailbox extends React.Component<WithApolloClient<IMailboxProps>, IMailboxState> {
	public state = {
		mgsToFetch: 10
	};

	private markConvAsRead = async () => {
		const { oponentId, client } = this.props;
		const { cache } = client;

		const { data: { markConversationAsRead } } = await client.mutate({
			mutation: MARK_CONV_AS_READ,
			variables: { id: oponentId }
		}) as IMarkConvAsReadRes;

		if (!markConversationAsRead) return;
		const getConversation = cache.readFragment({
			id: oponentId!,
			fragment: ConvNavFragment,
		})!;

		cache.writeFragment({
			id: oponentId!,
			fragment: ConvNavFragment,
			data: Object.assign(getConversation, { seen: true })
		});
		client.queryManager!.broadcastQueries();
	}

	public render() {
		const { oponentId, classes } = this.props;
		if (!oponentId) return <Empty classes={classes} i18nID='chat.mailbox.nothingSelected' />;
		const { mgsToFetch } = this.state;
		const variables = { id: oponentId, skip: 0, limit: mgsToFetch };

		return (
			<Query query={GET_CONVERSATION} variables={variables} errorPolicy='all'>
				{({ loading, error, data, fetchMore }) => {
					if (loading) return <Empty classes={classes} i18nID='chat.mailbox.loading' />;
					if (!data) return <Empty classes={classes} i18nID='chat.mailbox.nothingSelected' />;

					const { getConversation }: IGetConversationResponse = data;
					if (error) {
						if (getConversation === null) return <Redirect to='/' push />;
						return <Empty classes={classes} i18nID='error.UnknownError' />;
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
									markConvAsRead={this.markConvAsRead}
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
	}
}

export default withStyles(mailboxStyles, { name: 'Mailbox' })(withApollo(Mailbox));
