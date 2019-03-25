import React, { Suspense, useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { useApolloClient } from 'react-apollo-hooks';
import cookie from 'cookie';
import 'normalize.css';
import '../providers/i18nInit';

import CustomRouter from './RouterHelpers/CustomRouter';
import PrivateRoute from './RouterHelpers/PrivateRoute';
import Error from './Error/Error';
import Navigator from './Navigator/Navigator';
import Chat from './Chat/Chat';
import Login from './Login/Login';
import MainPage from './MainPage/MainPage';

import { GetLoginStatusDocument, GetLoginStatusQuery } from '@codegen';
import appStyles from './App.style';

const useLoginStatus = () => {
	const client = useApolloClient();

	const [status, setStatus] = useState(() => {
		const { logged_in } = cookie.parse(document.cookie);
		const isLoggedIn = logged_in === 'true' ? true : false;
		client.writeData({ data: { app: { __typename: 'App', isLoggedIn } } });
		return isLoggedIn;
	});

	useEffect(() => {
		const watchQuery = client.watchQuery<GetLoginStatusQuery>({ query: GetLoginStatusDocument }).subscribe({
			next({ data: { app: { isLoggedIn } } }) {
				setStatus(isLoggedIn);
			}
		});
		return () => watchQuery.unsubscribe();
	});
	return status;
};

const App = () => {
	const classes = appStyles();
	const isLoggedIn = useLoginStatus();

	return (
		<CustomRouter isLoggedIn={isLoggedIn}>{locationHref =>
			<div className={classes.root}>
				<Navigator locationHref={locationHref} />
				<Switch>
					<Route exact from='/' component={MainPage} />
					<PrivateRoute auth={isLoggedIn} path='/chat/:oponentId?' component={Chat} />
					<PrivateRoute auth={isLoggedIn} path='/login' component={Login} whenUnlogged />
					<Route component={Error} />
				</Switch>
			</div>
		}</CustomRouter>
	);
};

export default () => (
	<Suspense fallback={<span>Loading...</span>}>
		<App />
	</Suspense>
);
