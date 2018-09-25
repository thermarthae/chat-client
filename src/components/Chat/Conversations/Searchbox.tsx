import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { withApollo, WithApolloClient } from 'react-apollo';
import { SET_INBOX_FILTER, FIND_CONV_AND_USR, IFindConvAndUsrRes } from './Searchbox.apollo';
import { TInboxFilter } from './Conversations.apollo';

import './Searchbox.style.scss';
import ConversationList from './ConversationList/ConversationList';
import UserList from './UserList/UserList';
import FakeConversations from './FakeConversations';
import EmptyItem from './EmptyItem';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListSubheader from '@material-ui/core/ListSubheader';

import Search from '@material-ui/icons/Search';
import Cancel from '@material-ui/icons/Cancel';


interface ISearchboxProps extends InjectedIntlProps {
	inboxFilter: TInboxFilter;
}

interface ISearchboxState {
	query: string;
	result: IFindConvAndUsrRes;
	waitingForRes: boolean;
	prevInboxFilter: TInboxFilter;
	queryOnFlight?: NodeJS.Timer;
	isQueryTooShort: boolean;
}

class Searchbox extends React.PureComponent<WithApolloClient<ISearchboxProps>, ISearchboxState> {
	public state = {
		query: '',
		result: {
			findConversation: [],
			findUser: []
		},
		waitingForRes: false,
		prevInboxFilter: 'ALL' as TInboxFilter,
		queryOnFlight: undefined,
		isQueryTooShort: true,
	};

	private handleFocus = () => {
		const prevInboxFilter = this.props.inboxFilter;
		if (prevInboxFilter !== 'SEARCH') this.setState({ prevInboxFilter });
	}

	private handleClearInput = async () => {
		const { prevInboxFilter } = this.state;
		await this.setInboxFilter(prevInboxFilter);
		this.setState({ query: '', waitingForRes: false });
	}

	private handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		this.setState({ query });

		if (query.length < 1) return await this.setInboxFilter(this.state.prevInboxFilter);
		await this.setInboxFilter('SEARCH');
		if (query.length <= 3) return this.setState({ isQueryTooShort: true });

		this.setState({ waitingForRes: true, isQueryTooShort: false });
		this.setState(prevState => {
			clearInterval(prevState.queryOnFlight!);
			return { queryOnFlight: setTimeout(() => this.searchQuery(query), 400) };
		});
	}

	private setInboxFilter = async (inboxFilter: TInboxFilter) => {
		return await this.props.client.mutate({
			mutation: SET_INBOX_FILTER,
			variables: { inboxFilter }
		});
	}

	private searchQuery = async (query: string) => {
		const { data } = await this.props.client.query<IFindConvAndUsrRes>({
			query: FIND_CONV_AND_USR,
			variables: { query },
		});
		this.setState({
			waitingForRes: false,
			result: data
		});
	}

	public render() {
		const { inboxFilter, intl: { formatMessage } } = this.props;
		const { query, isQueryTooShort, waitingForRes, result } = this.state;
		const { findConversation, findUser } = result as IFindConvAndUsrRes;

		const shouldDisplay = (inboxFilter === 'SEARCH') ? true : false;
		const isConvArr = !!findConversation[0];
		const isUserArr = !!findUser[0];

		return (
			<>
				<div className='head searchbox' style={{ position: 'relative' }}>
					<Input
						value={query}
						onChange={this.handleChange}
						classes={{ root: 'searchbar' }}
						disableUnderline
						placeholder={formatMessage({ id: 'chat.conversations.search' })}
						startAdornment={
							<Search className='btn' />
						}
						onFocus={this.handleFocus}
						endAdornment={
							<IconButton className='cancel' onClick={this.handleClearInput} >
								<Cancel style={{ fontSize: 'inherit' }} />
							</IconButton>
						}
					/>
					{waitingForRes && <LinearProgress className='progress-bar' variant='query' />}
				</div>
				{shouldDisplay && <>
					{waitingForRes
						? <FakeConversations />
						: isQueryTooShort
							? <EmptyItem>Query is too short</EmptyItem>
							: <>
								{!isUserArr && !isConvArr
									? <EmptyItem>No results</EmptyItem>
									: <div className='list search-result'>
										{isUserArr && <>
											<ListSubheader className='subheader'>Users</ListSubheader>
											<UserList userArr={findUser} />
										</>}
										{isConvArr && <>
											<ListSubheader className='subheader'>Conversations</ListSubheader>
											<ConversationList conversationArr={findConversation} />
										</>}
									</div>
								}
							</>
					}
				</>}
			</>
		);
	}
}

export default injectIntl(withApollo(Searchbox));
