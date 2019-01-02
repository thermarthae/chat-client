import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withApollo, WithApolloClient } from 'react-apollo';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';
import Search from '@material-ui/icons/Search';
import Cancel from '@material-ui/icons/Cancel';

import { SET_INBOX_FILTER, FIND_CONV_AND_USR, IFindConvAndUsrRes } from './Searchbox.apollo';
import { TInboxFilter } from '../Conversations.apollo';

import searchboxStyles, { TSearchboxStyles } from './Searchbox.style';
import FakeConversations from '../FakeConversations/FakeConversations';
import SearchResult from './SearchResult';
import EmptyItem from '../EmptyItem';

interface ISearchboxProps extends TSearchboxStyles {
	inboxFilter: TInboxFilter;
}

interface ISearchboxState {
	query: string;
	result: IFindConvAndUsrRes;
	waitingForRes: boolean;
	prevInboxFilter: TInboxFilter;
	queryOnFlight?: NodeJS.Timer;
	isQueryShort: boolean;
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
		isQueryShort: true,
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
		if (query.length <= 3) return this.setState({ isQueryShort: true });

		this.setState({ waitingForRes: true, isQueryShort: false });
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
		const { inboxFilter, classes } = this.props;
		const { query, isQueryShort, waitingForRes, result } = this.state;
		const shouldDisplay = (inboxFilter === 'SEARCH') ? true : false;

		return (
			<>
				<div className={classes.root} >
					<FormattedMessage id='chat.conversations.search'>{
						placeholder => <Input
							value={query}
							onChange={this.handleChange}
							classes={{
								root: classes.searchbar,
								input: classes.input
							}}
							className={(query ? 'filled ' : '') + (isQueryShort ? 'short' : '')}
							disableUnderline
							placeholder={placeholder as string}
							startAdornment={<Search className={classes.glassIco} />}
							onFocus={this.handleFocus}
							endAdornment={
								<IconButton className={classes.cancelBtn} onClick={this.handleClearInput}>
									<Cancel className={classes.ico} />
								</IconButton>
							}
						/>
					}</FormattedMessage>
					{waitingForRes && <LinearProgress className={classes.progressBar} variant='query' />}
				</div>
				{!shouldDisplay
					? null
					: isQueryShort
						? <EmptyItem><FormattedMessage id={'chat.searchbox.isQueryShort'} /></EmptyItem>
						: waitingForRes
							? <FakeConversations />
							: <SearchResult result={result} />
				}
			</>
		);
	}
}

export default withStyles(searchboxStyles, { name: 'Searchbox' })(withApollo(Searchbox));
