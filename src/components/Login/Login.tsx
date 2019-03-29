import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';

import { useApolloClient } from 'react-apollo-hooks';
import { LOG_IN, ILogInResponse } from './Login.apollo';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Logo from '@src/components/Logo/Logo';

import loginStyles from './Login.style';
import LoginStatusCtx from '@src/context/LoginStatus';

const Login = () => {
	const classes = loginStyles();
	const [t] = useTranslation();
	const client = useApolloClient();
	const [username, setUsername] = useState('andrzej@duda.gov');
	const [password, setPassword] = useState('andrzej');
	const [showPassword, setShowPassword] = useState(false);
	const [waitingForServer, setWaitingForServer] = useState(false);
	const [errorName, setErrorName] = useState<string | null>(null);
	const errorMsg = errorName ? t('error.' + errorName) : null;
	const [{ usernameErr, passwordErr }, setCredentialsErrors] = useState({
		usernameErr: false,
		passwordErr: false
	});
	const { isLoggedIn, setLoginStatus } = useContext(LoginStatusCtx);
	if (isLoggedIn) return <Redirect to='/' />;

	type TEvent = React.ChangeEvent<HTMLInputElement>;
	const handleUsernameChange = (event: TEvent) => setUsername(event.target.value);
	const handlePasswordChange = (event: TEvent) => setPassword(event.target.value);

	const handleShowPassswordClick = () => setShowPassword(!showPassword);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setWaitingForServer(true);
		setCredentialsErrors({
			usernameErr: false,
			passwordErr: false
		});
		setErrorName(null);

		try {
			const res = await client.query<ILogInResponse>({
				query: LOG_IN,
				fetchPolicy: 'no-cache',
				variables: { username, password },
				errorPolicy: 'all'
			});
			if (res.errors) {
				const err = res.errors[0];
				if (err.extensions) throw err.extensions.code;
				throw err;
			}
			setLoginStatus(true);
		} catch (err) {
			console.error(err);

			let usrErr = true;
			let pswdErr = true;

			if (typeof err !== 'string') setErrorName('UnknownError');
			else {
				setErrorName(err);
				switch (err) {
					case 'MissingPasswordError':
					case 'IncorrectPasswordError':
						usrErr = false;
						break;
					case 'MissingUsernameError':
					case 'IncorrectUsernameError':
					case 'AlreadyLoggedIn':
						pswdErr = false;
						break;
				}
			}

			setCredentialsErrors({
				usernameErr: usrErr,
				passwordErr: pswdErr
			});
			setWaitingForServer(false);
		}
	};

	return (
		<div className={classes.root}>
			<form action='' className={classes.form} onSubmit={handleSubmit}>
				<Card className={classes.container} raised>
					<Logo size={3} className={classes.logo} />
					<Typography
						variant='h5'
						align='center'
						gutterBottom
						children={t('login.title')}
					/>
					<Typography
						variant='body2'
						align='center'
						color='textSecondary'
						children={t('login.subtitle')}
					/>
					<div className={classes.textFields}>
						<TextField
							required
							fullWidth
							type='text'
							name='username'
							autoComplete='username'
							value={username}
							onChange={handleUsernameChange}
							error={usernameErr}
							label={t('login.username')}
							helperText={usernameErr ? errorMsg : ''}
							variant='outlined'
							margin='normal'
						/>
						<TextField
							required
							style={{ width: '100%' }} // TODO: wait for fullWidth fix
							type={showPassword ? 'text' : 'password'}
							name='password'
							autoComplete='password'
							value={password}
							onChange={handlePasswordChange}
							error={passwordErr}
							label={t('login.password')}
							helperText={passwordErr ? errorMsg : ''}
							variant='outlined'
							margin='normal'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleShowPassswordClick}>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
					</div>
					<div className={classes.actions}>
						<Button
							variant='text'
							color='primary'
							children={t('login.forgotPasswordButton')}
						/>
						<div className={classes.btnWrapper}>
							<Button
								color='primary'
								variant='contained'
								type='submit'
								disabled={waitingForServer === true}
								children={t('login.loginButton')}
							/>
							{waitingForServer ? <CircularProgress size='1.5em' className={classes.progress} /> : ''}
						</div>
					</div>
				</Card>
			</form>
		</div>
	);
};

export default Login;
