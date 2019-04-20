import React, { useContext } from 'react';
import { useApolloClient } from 'react-apollo-hooks';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import navigatorStyles from './Navigator.style';
import Logo from '../Logo/Logo';
import Jewels from './Jewels/Jewels';

import { LOGOUT } from './Navigator.apollo';
import LoginStatusCtx from '@src/context/LoginStatus';

interface INavigatorProps {
	locationHref: string;
}
const MenuAppBar = React.memo<INavigatorProps>(() => {
	const classes = navigatorStyles();
	const client = useApolloClient();

	const { isLoggedIn, setLoginStatus } = useContext(LoginStatusCtx);
	if (!isLoggedIn) return null;

	const handleLogout = async () => {
		await client.query({ query: LOGOUT, fetchPolicy: 'no-cache' });
		client.resetStore();
		setLoginStatus(false);
	};

	return (
		<AppBar position='relative' className={classes.root}>
			<Toolbar className={classes.toolbar}>
				<Logo />
				<Typography variant='h6' color='inherit' className={classes.grow} />
				<Jewels onLogout={handleLogout} />
			</Toolbar>
		</AppBar>
	);
},
	(prev, next) => (prev.locationHref.split('/')[3] === next.locationHref.split('/')[3])
);

export default MenuAppBar;
