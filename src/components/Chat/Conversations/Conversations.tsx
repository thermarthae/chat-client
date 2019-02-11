import React from 'react';
import { Translation } from 'react-i18next';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import convStyles, { TConvStyles } from './Conversations.style';
import {
	GET_SEARCH_STATUS,
	GET_CONV_ARR, IGetConvArrResponse,
	UPDATED_CONV_SUBSCRIPTION, IConversation,
	GET_SUB_STATUS, IGetConvSubStatusRes, TOGGLE_CONV_SUB_STATUS
} from './Conversations.apollo';

import Header from './Header/Header';
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
		return (
			<Query query={GET_SEARCH_STATUS}>
				{({ data: { chat: { searchStatus } } }) =>
					<div className={this.props.classes.root}>
						<div className={this.props.classes.widthFix}>
							<Header />
							<Searchbox searchStatus={searchStatus} />
							<Query<IGetConvArrResponse> query={GET_CONV_ARR}>
								{({ loading, error, data }) => {
									if (error) return `Error! ${error.message}`;
									if (loading) return <FakeConversations />;
									if (searchStatus) return null;

									const { getUserConversations } = data!;
									if (!getUserConversations[0]) return (
										<EmptyItem>
											<Translation>{t =>
												<span>{t('chat.conversations.nothingToShow')}</span>
											}</Translation>
										</EmptyItem>
									);
									return <ConversationList conversationArr={getUserConversations} />;
								}}
							</Query>
						</div>
					</div>
				}
			</Query>
		);
	}
}
export default withApollo(withStyles(convStyles)(Conversations));
