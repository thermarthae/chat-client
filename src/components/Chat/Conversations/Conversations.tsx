import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import convStyles, { TConvStyles } from './Conversations.style';
import {
	GET_CHAT_FILTER, TInboxFilter,
	GET_CONV_ARR, IGetConvArrResponse,
	UPDATED_CONV_SUBSCRIPTION, IConversation,
	GET_SUB_STATUS, IGetConvSubStatusRes, TOGGLE_CONV_SUB_STATUS
} from './Conversations.apollo';

import Searchbox from './Searchbox/Searchbox';
import ConversationList from './ConversationList/ConversationList';
import FakeConversations from './FakeConversations/FakeConversations';
import EmptyItem from './EmptyItem';

interface IConversationsProps extends TConvStyles { }
class Conversations extends React.Component<WithApolloClient<IConversationsProps>> {
	private subscribe = () => {
		const { client } = this.props;
		const { subscriptions } = client.readQuery<IGetConvSubStatusRes>({ query: GET_SUB_STATUS })!;
		if (subscriptions.conversations) return;

		client.mutate({ mutation: TOGGLE_CONV_SUB_STATUS });
		client.subscribe({
			query: UPDATED_CONV_SUBSCRIPTION,
		}).subscribe({
			next({ data }) {
				try {
					const updatedConv = data.updatedConversation as IConversation;
					const { getUserConversations } = client.readQuery<IGetConvArrResponse>({ query: GET_CONV_ARR })!;
					const convExist = getUserConversations.find(cnv => cnv._id === updatedConv._id);

					if (!convExist) client.writeQuery({
						query: GET_CONV_ARR,
						data: {
							getUserConversations: [...getUserConversations, updatedConv],
						}
					});
				} catch (err) { } // tslint:disable-line
			},
			error(err) { console.error('Conversations subscription error:', err); },
		});
	}

	public componentDidMount() {
		this.subscribe();
	}

	public render() {
		return <Query query={GET_CHAT_FILTER} >{
			({ data: { chat: { inboxFilter } } }) =>
				<div className={this.props.classes.root}>
					<Searchbox inboxFilter={inboxFilter} />
					<Query query={GET_CONV_ARR} >
						{({ loading, error, data }) => {
							if (error) return `Error! ${error.message}`;
							if (loading) return <FakeConversations />;

							const { getUserConversations }: IGetConvArrResponse = data;

							let filteredConv = [];
							switch (inboxFilter as TInboxFilter) {
								case 'SEARCH':
									return null;
									break;
								case 'DRAFT':
									filteredConv = getUserConversations.filter(conv => conv.draft);
									break;
								case 'UNREAD':
									filteredConv = getUserConversations.filter(conv => !conv.seen);
									break;
								default:
									filteredConv = getUserConversations;
									break;
							}

							if (!filteredConv[0]) return <EmptyItem>
								<FormattedMessage id='chat.conversations.nothingToShow' />
							</EmptyItem>;

							return <ConversationList conversationArr={filteredConv} />;
						}}
					</Query>
				</div>
		}</Query>;
	}
}
export default withApollo(withStyles(convStyles)(Conversations));
