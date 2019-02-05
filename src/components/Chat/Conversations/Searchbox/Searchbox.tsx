import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withApollo, WithApolloClient } from 'react-apollo';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';
import Search from '@material-ui/icons/Search';
import Cancel from '@material-ui/icons/Cancel';

import { SET_SEARCH_STATUS, FIND_CONV_AND_USR, IFindConvAndUsrRes } from './Searchbox.apollo';

import searchboxStyles, { TSearchboxStyles } from './Searchbox.style';
import FakeConversations from '../FakeConversations/FakeConversations';
import SearchResult from './SearchResult';
import EmptyItem from '../EmptyItem';

interface ISearchboxProps extends TSearchboxStyles {
	searchStatus: boolean;
}

interface ISearchboxState {
	query: string;
	result: IFindConvAndUsrRes;
	waitingForRes: boolean;
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
		queryOnFlight: undefined,
		isQueryShort: true,
	};

	private handleClearInput = async () => {
		await this.setSearchResult(false);
		this.setState({ query: '', waitingForRes: false });
	}

	private handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		this.setState({ query });

		if (query.length < 1) return this.setSearchResult(false);
		await this.setSearchResult();
		if (query.length <= 3) return this.setState({ isQueryShort: true });

		this.setState({ waitingForRes: true, isQueryShort: false });
		this.setState(prevState => {
			clearInterval(prevState.queryOnFlight!);
			return { queryOnFlight: setTimeout(() => this.searchQuery(query), 400) };
		});
	}

	private setSearchResult = async (status = true) => {
		return this.props.client.mutate({
			mutation: SET_SEARCH_STATUS,
			variables: { status }
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
		const { classes, searchStatus } = this.props;
		const { query, isQueryShort, waitingForRes, result } = this.state;

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
							className={query ? 'filled ' : ''}
							disableUnderline
							placeholder={placeholder as string}
							startAdornment={<Search className={classes.glassIco} />}
							endAdornment={
								<IconButton className={classes.cancelBtn} onClick={this.handleClearInput}>
									<Cancel className={classes.ico} />
								</IconButton>
							}
						/>
					}</FormattedMessage>
					{waitingForRes && <LinearProgress className={classes.progressBar} variant='query' />}
				</div>
				{!searchStatus
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
