import React from 'react';
import ApolloClient from 'apollo-client';
import Query from 'react-apollo/Query';
import { GET_LOGIN_STATUS } from '../App.apollo';
import { LOGOUT } from './Navigator.apollo';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import navigatorStyles from './Navigator.style';
import LinkIconButton from '../LinkButtons/LinkIconButton';
import Logo from '../Logo/Logo';

const handleLogout = async (client: ApolloClient<any>) => {
	await client.query({ query: LOGOUT, fetchPolicy: 'no-cache', errorPolicy: 'all' });
	client.resetStore();
};

interface INavigatorProps {
	locationHref: string;
}
const MenuAppBar = React.memo<INavigatorProps>(() => {
	const classes = navigatorStyles();

	return (
		<Query query={GET_LOGIN_STATUS}>{
			({ client, data: { app: { isLoggedIn } } }) => {
				if (!isLoggedIn) return null;
				return <AppBar position='relative' className={classes.root}>
					<Toolbar className={classes.toolbar}>
						<Logo />
						<Typography variant='h6' color='inherit' className={classes.grow} />
						<div>
							<LinkIconButton exact={false} to='/chat'>
								<Badge color='error' badgeContent={'?'} >
									<MailIcon titleAccess='Chat' />
								</Badge>
							</LinkIconButton>
							<LinkIconButton to='/login'>
								<AccountCircle titleAccess='Login' />
							</LinkIconButton>
							<IconButton color='inherit' onClick={() => handleLogout(client)}>
								<PowerSettingsNew titleAccess='Logout' />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>;
			}}
		</Query>
	);
},
	(prev, next) => (prev.locationHref.split('/')[3] === next.locationHref.split('/')[3])
);

export default MenuAppBar;
