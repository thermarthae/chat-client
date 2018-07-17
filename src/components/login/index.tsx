import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RouterProps } from 'react-router';

import withApollo, { WithApolloClient } from 'react-apollo/withApollo';
import { LOG_IN, ILogInResponse, SET_LOGIN_STATUS } from './index.apollo';

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

import '../../style/login.component.scss';

interface ILoginProps extends InjectedIntlProps, RouterProps { }

interface ILoginStates {
	username: string;
	password: string;
	usernameError: boolean;
	passwordError: boolean;
	showPassword: boolean;
	waitingForServer: boolean;
}

class Login extends React.PureComponent<WithApolloClient<ILoginProps>, ILoginStates> {
	public state = {
		username: 'admin',
		password: 'admin1',
		usernameError: false,
		passwordError: false,
		showPassword: false,
		waitingForServer: false,
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
			this.setState({ waitingForServer: true });

			const { data: { getAccess } } = await client.query<ILogInResponse>({
				query: LOG_IN,
				fetchPolicy: 'no-cache',
				variables: { username, password },
			});
			if (getAccess.error) throw getAccess;

			await client.mutate({ mutation: SET_LOGIN_STATUS });
			history.push('/');
		} catch (err) {
			const errorInfo = err.error ? `Error ${err.error.code}: ${err.error.message}` : err;
			console.error(errorInfo);

			let usernameErr = true;
			let passwordErr = true;

			if (err.error)
				if (err.error.code === 100) passwordErr = false; // 100 => username
				else if (err.error.code === 200) usernameErr = false; // 200 => password

			this.setState({
				usernameError: usernameErr,
				passwordError: passwordErr,
				waitingForServer: false
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
		} = this.state;
		const { formatMessage } = this.props.intl;

		let usernameHelper: any;
		let passwordHelper: any;
		if (usernameError && passwordError) {
			usernameHelper = formatMessage({ id: 'error.Err999' });
			passwordHelper = <FormHelperText>{usernameHelper}</FormHelperText>;
		}
		else if (usernameError) usernameHelper = formatMessage({ id: 'error.Err100' });
		else if (passwordError) passwordHelper = <FormHelperText>{formatMessage({ id: 'error.Err200' })}</FormHelperText>;

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
								helperText={usernameHelper}
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
								{passwordHelper}
							</FormControl>
						</div>
					</CardContent>
					<CardActions className='buttons'>
						<Button
							variant='flat'
							color='primary'
							className='btn'
							size='small'
						>
							{formatMessage({ id: 'login.forgotPasswordButton' })}
						</Button>
						<div className='buttonWrapper'>
							<Button
								color='primary'
								variant='raised'
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
