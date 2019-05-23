import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from 'react-apollo-hooks';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Search from '@material-ui/icons/Search';
import Cancel from '@material-ui/icons/Cancel';

import { FIND_CONV_AND_USR, IFindConvAndUsrRes } from './Searchbox.apollo';

import searchboxStyles from './Searchbox.style';
import FakeConversations from '../FakeConversations/FakeConversations';
import SearchResult from './SearchResult';
import EmptyItem from '../../EmptyItem/EmptyItem';



const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
};



interface ISearchboxProps {
	searchStatus: boolean;
	setSearchStatus: (status: boolean) => void;
}
const Searchbox = ({ searchStatus, setSearchStatus }: ISearchboxProps) => {
	const classes = searchboxStyles();
	const client = useApolloClient();
	const [t] = useTranslation();
	const [queryValue, setQueryValue] = useState('');
	const [waitingForRes, setWaitingForRes] = useState(false);
	const [isQueryShort, setIsQueryShort] = useState(false);
	const emptyResult = {
		findConversation: [],
		findUser: []
	};
	const [result, setResult] = useState<IFindConvAndUsrRes>(emptyResult);
	const debouncedSearchTerm = useDebounce(queryValue, 400);

	useEffect(() => {
		if (debouncedSearchTerm) {
			if (debouncedSearchTerm.length <= 3) return setIsQueryShort(true);
			setIsQueryShort(false);
			setSearchStatus(true);
			searchQuery(debouncedSearchTerm);
		}
	}, [debouncedSearchTerm]
	);

	const handleClearInput = () => {
		setSearchStatus(false);
		setWaitingForRes(false);
		setQueryValue('');
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		if (query.length === 0) setSearchStatus(false);
		setQueryValue(query);
	};

	const searchQuery = async (query: string) => {
		setWaitingForRes(true);

		const { data } = await client.query<IFindConvAndUsrRes>({
			query: FIND_CONV_AND_USR,
			variables: { query },
			fetchPolicy: 'no-cache',
		});
		setResult(data);

		setWaitingForRes(false);
	};

	return (
		<>
			<div className={classes.root} >
				<Input
					value={queryValue}
					onChange={handleChange}
					classes={{
						root: classes.searchbar,
						input: classes.input
					}}
					className={queryValue ? 'filled ' : ''}
					disableUnderline
					placeholder={t('chat.conversations.search')}
					startAdornment={<Search className={classes.glassIco} />}
					endAdornment={
						<IconButton className={classes.cancelBtn} onClick={handleClearInput}>
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
};

export default React.memo(Searchbox);
