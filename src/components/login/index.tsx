import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { gql, ApolloClient } from "apollo-boost";
import { withApollo } from "react-apollo";

import Button from "material-ui/Button";
import Card, { CardActions, CardContent } from "material-ui/Card";
import "../../style/login.component.scss";

import TextField from "material-ui/TextField";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { CircularProgress } from "material-ui/Progress";
import { FormControl, FormHelperText } from "material-ui/Form";
import IconButton from "material-ui/IconButton";
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";

const getAccessQuery = gql`
	query ($username: String!, $password: String!){
		getAccess(username: $username, password: $password) {
			user {
				_id
				name
				email
				isAdmin
			}
			access_token
			refresh_token
			error {
				code
				message
			}
		}
	}
`;

const loginStatusMutation = gql`
	mutation ($isLoggedIn: Boolean!, $_id: String!, $name: String!, $email: String!, $isAdmin: Boolean!){
		logIn(isLoggedIn: $isLoggedIn, _id: $_id, name: $name, email: $email, isAdmin: $isAdmin) @client
	}
`;

interface IGetAccessQueryResponse {
	getAccess: {
		user: {
			_id: string
			name: string
			email: string
			isAdmin: boolean
		}
		access_token: string;
		refresh_token: string;
		error?: {
			code: number;
			message: string;
		}
	};
}

///////////////////////////////////////////////////////////

interface ILoginProps extends InjectedIntlProps {
	client: ApolloClient<any>;
}

interface ILoginStates {
	username: string;
	password: string;
	usernameError: boolean;
	passwordError: boolean;
	showPassword: boolean;
	waitingForServer: boolean;
}

class Login extends React.PureComponent<ILoginProps, ILoginStates> {
	public state = {
		username: "",
		password: "",
		usernameError: false,
		passwordError: false,
		showPassword: false,
		waitingForServer: false,
	};

	private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ password: event.target.value });
	}

	private handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ username: event.target.value });
	}

	private handleShowPassswordClick = () => {
		this.setState({ showPassword: !this.state.showPassword });
	}

	// private timer: any;
	private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		this.setState({ waitingForServer: true });

		try {
			const { username, password } = this.state;
			const { data: { getAccess } } = await this.props.client.query<IGetAccessQueryResponse>({
				query: getAccessQuery,
				fetchPolicy: "network-only",
				variables: { username, password }
			});
			if (getAccess.error) throw getAccess;
			this.setState({ waitingForServer: false });

			this.props.client.mutate<IGetAccessQueryResponse>({
				mutation: loginStatusMutation,
				variables: {
					isLoggedIn: true,
					_id: getAccess.user._id,
					name: getAccess.user.name,
					email: getAccess.user.email,
					isAdmin: getAccess.user.isAdmin
				}
			});

			localStorage.setItem("access_token", getAccess.access_token); //TODO
			localStorage.setItem("refresh_token", getAccess.refresh_token); //TODO
			console.log("login success", getAccess);
		} catch (err) {
			let usernameErr = false;
			let passwordErr = false;
			if (err.error && err.error.code === 100) usernameErr = true;
			else if (err.error && err.error.code === 200) passwordErr = true;

			this.setState({
				usernameError: usernameErr,
				passwordError: passwordErr,
				waitingForServer: false
			});
			console.error("login failed!", err);
		}
	}

	public render() {
		const { waitingForServer, usernameError, passwordError, username, password, showPassword } = this.state;
		const { formatMessage } = this.props.intl;

		const usernameHelper = (usernameError) ?
			formatMessage({
				id: "error.Err100",
				defaultMessage: "Username doesn't belong to any account",
			})
			: "";

		const passwordHelper = (passwordError) ?
			<FormHelperText>
				{formatMessage({
					id: "error.Err200",
					defaultMessage: "Password is incorrect"
				})}
			</FormHelperText>
			: "";

		return (
			<form action="" id="login" onSubmit={this.handleSubmit}>
				<Card className="container">
					<CardContent>
						<div className="title">
							{formatMessage({
								id: "login.title",
								defaultMessage: "Login"
							})}
						</div>
						<div className="subtitle">
							{formatMessage({
								id: "login.subtitle",
								defaultMessage: "Login to continue"
							})}
						</div>
						<div className="form">
							<TextField
								required
								fullWidth
								type="text"
								autoComplete="username"
								value={username}
								onChange={this.handleUsernameChange}
								error={usernameError}
								label={formatMessage({
									id: "login.username",
									defaultMessage: "Email"
								})}
								helperText={usernameHelper}
							/>
							<FormControl
								fullWidth
								required
								error={passwordError}
							>
								<InputLabel>
									{formatMessage({
										id: "login.password",
										defaultMessage: "Password"
									})}
								</InputLabel>
								<Input
									autoComplete="password"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={this.handlePasswordChange}
									endAdornment={
										<InputAdornment position="end">
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
					<CardActions className="buttons">
						<Button
							variant="flat"
							color="primary"
							className="btn"
							size="small"
						>
							{formatMessage({
								id: "login.forgotPasswordButton",
								defaultMessage: "Forgot password"
							})}
						</Button>
						<div className="buttonWrapper">
							<Button
								color="primary"
								variant="raised"
								className="btn"
								size="small"
								type="submit"
								disabled={waitingForServer}
							>
								{formatMessage({
									id: "login.loginButton",
									defaultMessage: "Login"
								})}
							</Button>
							{waitingForServer && <CircularProgress size="1.5em" className="progress" />}
						</div>
					</CardActions>
				</Card>
			</form>
		);
	}
}
export default injectIntl(withApollo(Login));
