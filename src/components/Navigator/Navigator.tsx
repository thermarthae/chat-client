import * as React from 'react';
import { NavLink } from 'react-router-dom';

import ApolloClient from 'apollo-client';
import Query from 'react-apollo/Query';
import { GET_LOGIN_STATUS, LOGOUT } from './Navigator.apollo';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Chat from '@material-ui/icons/Chat';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { withStyles } from '@material-ui/styles';
import navigatorStyles, { TNavigatorStyles } from './Navigator.style';

interface INavigatorProps extends TNavigatorStyles {
	locationHref: string;
}

class Navigator extends React.Component<INavigatorProps> {
	public shouldComponentUpdate(nextProps: INavigatorProps) {
		if (nextProps.locationHref.split('/')[3] !== this.props.locationHref.split('/')[3]) return true;
		return false;
	}

	private handleLogout = async (client: ApolloClient<any>) => {
		await client.query({ query: LOGOUT, fetchPolicy: 'no-cache', errorPolicy: 'all' });
		client.resetStore();
	}

	public render() {
		const { classes } = this.props;
		return (
			<Query query={GET_LOGIN_STATUS}>{
				({ client, data: { app: { isLoggedIn } } }) => {
					if (!isLoggedIn) return null;
					return (
						<nav className={classes.root}>
							<div className={classes.navLink}>
								<IconButton className={classes.btn} onClick={() => this.handleLogout(client)}>
									<PowerSettingsNew style={{ fontSize: 'inherit' }} />
								</IconButton>
							</div>
							<NavLink
								exact={false}
								className={classes.navLink}
								activeClassName={classes.active}
								to='/chat'
							>
								<IconButton className={classes.btn}>
									<Chat style={{ fontSize: 'inherit' }} />
								</IconButton>
							</NavLink>
							<NavLink
								className={classes.navLink}
								activeClassName={classes.active}
								to='/login'
							>
								<IconButton className={classes.btn}>
									<AccountCircle style={{ fontSize: 'inherit' }} />
								</IconButton>
							</NavLink>
						</nav>
					);
				}
			}</Query>
		);
	}
}
export default withStyles(navigatorStyles)(Navigator);
