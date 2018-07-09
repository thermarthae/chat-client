import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import Query from 'react-apollo/Query';
import { GET_LOGIN_STATUS } from './navigator.apollo';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Chat from '@material-ui/icons/Chat';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import '../style/navigator.component.scss';

const handleLogout = (client: any) => {
	document.cookie = 'sign_token' + '=; Max-Age=0';
	client.resetStore();
};

const Navigator = () => (
	<Query query={GET_LOGIN_STATUS}>{
		({ client, data: { app: { isLoggedIn } } }) => {
			if (!isLoggedIn) return null;

			return <nav id='navigator'>
				<div className='btn btn-big'>
					<IconButton className='btn' onClick={() => handleLogout(client)}>
						<PowerSettingsNew style={{ fontSize: 'inherit' }} />
					</IconButton>
				</div>
				<NavLink
					exact={false}
					className='btn btn-big switch'
					activeClassName='active'
					to='/chat'
				>
					<IconButton className='btn'>
						<Chat style={{ fontSize: 'inherit' }} />
					</IconButton>
				</NavLink>
				<NavLink
					className='btn btn-big switch'
					activeClassName='active'
					to='/login'
				>
					<IconButton className='btn'>
						<AccountCircle style={{ fontSize: 'inherit' }} />
					</IconButton>
				</NavLink>
			</nav>;
		}
	}</Query>
);

export default withRouter(Navigator);
