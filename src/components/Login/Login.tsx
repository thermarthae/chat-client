import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RouterProps } from 'react-router';

import withApollo, { WithApolloClient } from 'react-apollo/withApollo';
import { LOG_IN, ILogInResponse, SET_LOGIN_STATUS } from './Login.apollo';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './Login.style.scss';

interface ILoginProps extends InjectedIntlProps, RouterProps { }

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
		const { formatMessage } = this.props.intl;

		const errorMsg = errorName ? formatMessage({ id: 'error.' + errorName }) : undefined;

		return (
			<form action='' id='login' onSubmit={this.handleSubmit}>
				<Card className='container'>
					<CardContent>
						<div className='title'>
							{formatMessage({ id: 'login.title' })}
						</div>
						<div className='subtitle'>
							{formatMessage({ id: 'login.subtitle' })}
						</div>
						<div className='form'>
							<TextField
								required
								fullWidth
								type='text'
								name='username'
								autoComplete='username'
								value={username}
								onChange={this.handleChange}
								error={usernameError}
								label={formatMessage({ id: 'login.username' })}
								helperText={usernameError ? errorMsg : ''}
							/>
							<FormControl
								fullWidth
								required
								error={passwordError}
							>
								<InputLabel>
									{formatMessage({ id: 'login.password' })}
								</InputLabel>
								<Input
									name='password'
									autoComplete='password'
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={this.handleChange}
									endAdornment={
										<InputAdornment position='end'>
											<IconButton
												onClick={this.handleShowPassswordClick}
												onMouseDown={e => e.preventDefault()}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
								/>
								{passwordError && <FormHelperText>{errorMsg}</FormHelperText>}
							</FormControl>
						</div>
					</CardContent>
					<CardActions className='buttons'>
						<Button
							variant='text'
							color='primary'
							className='btn'
							size='small'
						>
							{formatMessage({ id: 'login.forgotPasswordButton' })}
						</Button>
						<div className='buttonWrapper'>
							<Button
								color='primary'
								variant='contained'
								className='btn'
								size='small'
								type='submit'
								disabled={waitingForServer === true}
							>
								{formatMessage({ id: 'login.loginButton' })}
							</Button>
							{waitingForServer ? <CircularProgress size='1.5em' className='progress' /> : ''}
						</div>
					</CardActions>
				</Card>
			</form>
		);

	}
}
export default injectIntl(withApollo(Login));
