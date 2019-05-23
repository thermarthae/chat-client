import React, { Suspense, useState } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import cookie from 'cookie';
import 'normalize.css';
import '../providers/i18nInit';

import CustomRouter from './RouterHelpers/CustomRouter';
import PrivateRoute from './RouterHelpers/PrivateRoute';
import Error from './Error/Error';
import Navigator from './Navigator/Navigator';
import Chat from './Chat/Chat';
import Login from './Login/Login';
import Register from './Register/Register';
import MainPage from './MainPage/MainPage';

import appStyles from './App.style';
import LoginStatusCtx from '@src/context/LoginStatus';

const App = () => {
	const classes = appStyles();
	const [isLoggedIn, setLoginStatus] = useState(() => {
		const { logged_in } = cookie.parse(document.cookie);
		const status = logged_in === 'true' ? true : false;
		return status;
	});

	return (
		<LoginStatusCtx.Provider value={{ isLoggedIn, setLoginStatus }}>
			<CustomRouter isLoggedIn={isLoggedIn}>{locationHref =>
				<div className={classes.root}>
					<Navigator locationHref={locationHref} />
					<Switch>
						<Route exact from='/' component={MainPage} />
						<PrivateRoute auth={isLoggedIn} path='/chat/:friendlyConvID?' component={Chat} />
						<PrivateRoute auth={isLoggedIn} path='/login' component={Login} whenUnlogged />
						<PrivateRoute auth={isLoggedIn} path='/register' component={Register} whenUnlogged />
						<Route component={Error} />
					</Switch>
				</div>
			}</CustomRouter>
		</LoginStatusCtx.Provider>
	);
};

export default () => (
	<Suspense fallback={<span>Loading...</span>}>
		<App />
	</Suspense>
);
