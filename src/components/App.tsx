import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import messages from '../locales';

import Query from 'react-apollo/Query';
import withApollo, { WithApolloClient } from 'react-apollo/withApollo';
import { GET_APP_DATA } from './App.apollo';

import './App.style.scss';

import Error from './Error/Error';
import Navigator from './Navigator/Navigator';
import Chat from './Chat/Chat';
import Login from './Login/Login';

class UpdateBlocker extends React.Component<{ children: (href: string) => React.ReactNode }> {
	private locationHref = location.href.replace(/\/$/, '');

	public shouldComponentUpdate() {
		const newLocation = location.href.replace(/\/$/, '');
		if (this.locationHref !== newLocation) {
			this.locationHref = newLocation;
			return true;
		}
		return false;
	}

	public render() {
		return this.props.children(this.locationHref);
	}
}

interface IPrivateRouteProps extends RouteProps {
	auth: boolean;
	component: React.ComponentType<any>;
	whenUnlogged?: boolean;
}

const PrivateRoute = ({ auth, component: Component, whenUnlogged, ...rest }: IPrivateRouteProps) => {
	return (
		<Route {...rest} render={props => {
			if (whenUnlogged) {
				if (!auth) return <Component {...props} />;
				return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
			}
			else {
				if (auth) return <Component {...props} />;
				return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
			}
		}} />
	);
};

interface IAppProps { }
type IAppPropsType = WithApolloClient<IAppProps>;

class App extends React.PureComponent<IAppPropsType> {
	constructor(props: IAppPropsType) {
		super(props);
		const isLoggedIn = document.cookie.includes('sign_token=');
		this.props.client.writeData({ data: { app: { __typename: 'App', isLoggedIn } } });
	}

	public render() {
		return (
			<Query query={GET_APP_DATA}>{
				({ data: { app: { language, isLoggedIn } } }) => {
					return <IntlProvider locale={language} messages={messages[language]}>
						<BrowserRouter>
							<UpdateBlocker>
								{locationHref => {
									return <div id='app'>
										<Navigator locationHref={locationHref} />
										<Switch>
											<Redirect exact from='/' to='/chat' />
											<PrivateRoute auth={isLoggedIn} path='/chat/:oponentId?' component={Chat} />
											<PrivateRoute auth={isLoggedIn} path='/login' component={Login} whenUnlogged />
											<Route component={Error} />
										</Switch>
									</div>;
								}}
							</UpdateBlocker>
						</BrowserRouter>
					</IntlProvider>;
				}
			}</Query>
		);
	}
}

export default withApollo(App);
