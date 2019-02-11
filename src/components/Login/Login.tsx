import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RouterProps } from 'react-router';

import withApollo, { WithApolloClient } from 'react-apollo/withApollo';
import { LOG_IN, ILogInResponse, SET_LOGIN_STATUS } from './Login.apollo';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/styles';
import Logo from '@src/components/Logo/Logo';

import loginStyles, { TLoginStyles } from './Login.style';

interface ILoginProps extends WithTranslation, RouterProps, TLoginStyles { }

interface ILoginStates {
	username: string;
	password: string;
	usernameError: boolean;
	passwordError: boolean;
	showPassword: boolean;
	waitingForServer: boolean;
	errorName?: string;
}

class Login extends React.PureComponent<WithApolloClient<ILoginProps>, ILoginStates> {
	public state = {
		username: 'andrzej@duda.gov',
		password: 'andrzej',
		usernameError: false,
		passwordError: false,
		showPassword: false,
		waitingForServer: false,
		errorName: undefined,
	};

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [event.target.name]: event.target.value } as any);
	}

	private handleShowPassswordClick = () => {
		this.setState(prevState => ({
			showPassword: !prevState.showPassword
		}));
	}

	private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { username, password } = this.state;
		const { client, history } = this.props;

		try {
			this.setState({
				waitingForServer: true,
				usernameError: false,
				passwordError: false,
				errorName: undefined,
			});

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
			await client.mutate({ mutation: SET_LOGIN_STATUS });

			history.push('/');
		} catch (err) {
			console.error(err);
			let usernameError = true;
			let passwordError = true;
			let errorName = 'UnknownError';

			if (typeof err === 'string') switch (err) {
				case 'MissingPasswordError':
				case 'IncorrectPasswordError':
					errorName = err;
					usernameError = false;
					break;
				case 'MissingUsernameError':
				case 'IncorrectUsernameError':
				case 'AlreadyLoggedIn':
					errorName = err;
					passwordError = false;
					break;
			}

			this.setState({
				waitingForServer: false,
				usernameError,
				passwordError,
				errorName,
			});
		}
	}

	public render() {
		const {
			username,
			password,
			usernameError,
			passwordError,
			showPassword,
			waitingForServer,
			errorName
		} = this.state;
		const { classes, t } = this.props;

		const errorMsg = errorName ? t('error.' + errorName) : undefined;

		return (
			<div className={classes.root}>
				<form action='' className={classes.form} onSubmit={this.handleSubmit}>
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
								onChange={this.handleChange}
								error={usernameError}
								label={t('login.username')}
								helperText={usernameError ? errorMsg : ''}
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
								onChange={this.handleChange}
								error={passwordError}
								label={t('login.password')}
								helperText={passwordError ? errorMsg : ''}
								variant='outlined'
								margin='normal'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton onClick={this.handleShowPassswordClick}>
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
	}
}
export default withStyles(loginStyles, { name: 'Login' })(withTranslation()(withApollo(Login)));
