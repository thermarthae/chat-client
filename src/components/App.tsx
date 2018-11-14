import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import * as cookie from 'cookie';
import messages from '../locales';

import Query from 'react-apollo/Query';
import withApollo, { WithApolloClient } from 'react-apollo/withApollo';
import { GET_APP_DATA } from './App.apollo';

import './App.style.scss';

import Error from './Error/Error';
import Navigator from './Navigator/Navigator';
import Chat from './Chat/Chat';
import Login from './Login/Login';

interface IUpdateBlocker {
	isLoggedIn: boolean;
	children: (href: string) => React.ReactNode;
}
class UpdateBlocker extends React.Component<IUpdateBlocker> {
	private locationHref = location.href.replace(/\/$/, '');

	public shouldComponentUpdate(nextProps: IUpdateBlocker) {
		if (nextProps.isLoggedIn !== this.props.isLoggedIn) return true;

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
		this.checkAuthStatus();
	}

	private checkAuthStatus = () => {
		const { logged_in } = cookie.parse(document.cookie);
		const isLoggedIn = logged_in === 'true' ? true : false;
		this.props.client.writeData({ data: { app: { __typename: 'App', isLoggedIn } } });
	}

	public render() {
		return (
			<Query query={GET_APP_DATA}>{
				({ data: { app: { language, isLoggedIn } } }) => {
					return <IntlProvider locale={language} messages={messages[language]}>
						<BrowserRouter>
							<UpdateBlocker isLoggedIn={isLoggedIn}>
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
