import React from 'react';
import { Route, Redirect } from 'react-router';
import { Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import cookie from 'cookie';
import messages from '../locales';

import Query from 'react-apollo/Query';
import withApollo, { WithApolloClient } from 'react-apollo/withApollo';
import { GET_APP_DATA } from './App.apollo';
import { withStyles } from '@material-ui/styles';
import appStyles, { TAppStyles } from './App.style';

import CustomRouter from './RouterHelpers/CustomRouter';
import PrivateRoute from './RouterHelpers/PrivateRoute';
import Error from './Error/Error';
import Navigator from './Navigator/Navigator';
import Chat from './Chat/Chat';
import Login from './Login/Login';


interface IAppProps extends TAppStyles { }
type IAppPropsType = WithApolloClient<IAppProps>;

class App extends React.PureComponent<IAppPropsType> {
	constructor(props: IAppPropsType) {
		super(props);
		this.checkAuthStatus();
	}

	private checkAuthStatus = () => {
		const { logged_in } = cookie.parse(document.cookie);
		const isLoggedIn = logged_in === 'true' ? true : false;
		this.props.client.writeData({ data: { app: { __typename: 'App', isLoggedIn } } });
	}

	public render() {
		const { classes } = this.props;

		return (
			<Query query={GET_APP_DATA}>{({ data: { app: { language, isLoggedIn } } }) => (
				<IntlProvider locale={language} messages={messages[language]}>
					<CustomRouter isLoggedIn={isLoggedIn}>{locationHref =>
						<div className={classes.root}>
							<Navigator locationHref={locationHref} />
							<Switch>
								<Redirect exact from='/' to='/chat' />
								<PrivateRoute auth={isLoggedIn} path='/chat/:oponentId?' component={Chat} />
								<PrivateRoute auth={isLoggedIn} path='/login' component={Login} whenUnlogged />
								<Route component={Error} />
							</Switch>
						</div>
					}</CustomRouter>
				</IntlProvider>
			)}</Query>
		);
	}
}
export default withStyles(appStyles, { name: 'App' })(withApollo(App));
