import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { withApollo, WithApolloClient } from 'react-apollo';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';
import Search from '@material-ui/icons/Search';
import Cancel from '@material-ui/icons/Cancel';

import { FIND_CONV_AND_USR, IFindConvAndUsrRes } from './Searchbox.apollo';

import searchboxStyles, { TSearchboxStyles } from './Searchbox.style';
import FakeConversations from '../FakeConversations/FakeConversations';
import SearchResult from './SearchResult';
import EmptyItem from '../../EmptyItem/EmptyItem';

interface ISearchboxProps extends WithTranslation, TSearchboxStyles {
	searchStatus: boolean;
	setSearchStatus: (status: boolean) => void;
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

	private handleClearInput = () => {
		this.props.setSearchStatus(false);
		this.setState({ query: '', waitingForRes: false });
	}

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		this.setState({ query });

		if (query.length < 1) return this.props.setSearchStatus(false);
		this.props.setSearchStatus(true);
		if (query.length <= 3) return this.setState({ isQueryShort: true });

		this.setState({ waitingForRes: true, isQueryShort: false });
		this.setState(prevState => {
			clearInterval(prevState.queryOnFlight!);
			return { queryOnFlight: setTimeout(() => this.searchQuery(query), 400) };
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
		const { classes, searchStatus, t } = this.props;
		const { query, isQueryShort, waitingForRes, result } = this.state;

		return (
			<>
				<div className={classes.root} >
					<Input
						value={query}
						onChange={this.handleChange}
						classes={{
							root: classes.searchbar,
							input: classes.input
						}}
						className={query ? 'filled ' : ''}
						disableUnderline
						placeholder={t('chat.conversations.search')}
						startAdornment={<Search className={classes.glassIco} />}
						endAdornment={
							<IconButton className={classes.cancelBtn} onClick={this.handleClearInput}>
								<Cancel className={classes.ico} />
							</IconButton>
						}
					/>
					{waitingForRes && <LinearProgress className={classes.progressBar} variant='query' />}
				</div>
				{!searchStatus
					? null
					: isQueryShort
						? <EmptyItem msg={t('chat.searchbox.isQueryShort')} />
						: waitingForRes
							? <FakeConversations />
							: <SearchResult result={result} />
				}
			</>
		);
	}
}

export default withStyles(searchboxStyles, { name: 'Searchbox' })(withTranslation()(withApollo(Searchbox)));
