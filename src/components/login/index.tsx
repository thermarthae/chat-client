import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Redirect } from "react-router";

import { ApolloClient } from "apollo-boost";
import { withApollo } from "react-apollo";
import * as ServerUserQueries from "../../apollo/server/queries/user.queries";
import * as StateUserMutations from "../../apollo/state/mutations/user.mutations";


import Button from "material-ui/Button";
import Card, { CardActions, CardContent } from "material-ui/Card";
import "../../style/login.component.scss";

import TextField from "material-ui/TextField";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { CircularProgress } from "material-ui/Progress";
import { FormControl, FormHelperText } from "material-ui/Form";
import IconButton from "material-ui/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
	loginSuccess: boolean;
}

class Login extends React.PureComponent<ILoginProps, ILoginStates> {
	public state = {
		username: "",
		password: "",
		usernameError: false,
		passwordError: false,
		showPassword: false,
		waitingForServer: false,
		loginSuccess: false,
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

	private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { username, password } = this.state;
		const { client } = this.props;
		this.setState({ waitingForServer: true });

		try {
			const { data: { getAccess } } = await client.query<ServerUserQueries.IGetAccessResponse>({
				query: ServerUserQueries.getAccess,
				fetchPolicy: "no-cache",
				variables: { username, password }
			});
			if (getAccess.error) throw getAccess;

			client.mutate({
				mutation: StateUserMutations.setLoginStatus,
				variables: {
					isLoggedIn: true,
					_id: getAccess.user._id,
					name: getAccess.user.name,
					email: getAccess.user.email,
					isAdmin: getAccess.user.isAdmin
				}
			});

			this.setState({
				waitingForServer: false,
				loginSuccess: true
			});

			console.log("Login success!:", getAccess);
			localStorage.setItem("access_token", getAccess.access_token); //TODO
			localStorage.setItem("refresh_token", getAccess.refresh_token); //TODO
		} catch (err) {
			const errorInfo = err.error ? `Error ${err.error.code}: ${err.error.message}` : err;
			console.error(errorInfo);

			let usernameErr = true;
			let passwordErr = true;
			if (err.error && err.error.code === 100) passwordErr = false; // 100 => username
			else if (err.error && err.error.code === 200) usernameErr = false; // 200 => password

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
			loginSuccess,
		} = this.state;
		const { formatMessage } = this.props.intl;
		let loginButtonProgress;
		let usernameHelper;
		let passwordHelper;

		if (loginSuccess) return <Redirect to="/" />;
		if (waitingForServer) loginButtonProgress = <CircularProgress size="1.5em" className="progress" />;
		if (usernameError && passwordError) {
			usernameHelper = formatMessage({ id: "error.Err999" });
			passwordHelper = <FormHelperText>{usernameHelper}</FormHelperText>;
		}
		else if (usernameError) usernameHelper = formatMessage({ id: "error.Err100" });
		else if (passwordError) passwordHelper = <FormHelperText>
			{formatMessage({ id: "error.Err200" })}
		</FormHelperText>;

		return (
			<form action="" id="login" onSubmit={this.handleSubmit}>
				<Card className="container">
					<CardContent>
						<div className="title">
							{formatMessage({ id: "login.title" })}
						</div>
						<div className="subtitle">
							{formatMessage({ id: "login.subtitle" })}
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
								label={formatMessage({ id: "login.username" })}
								helperText={usernameHelper}
							/>
							<FormControl
								fullWidth
								required
								error={passwordError}
							>
								<InputLabel>
									{formatMessage({ id: "login.password" })}
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
							{formatMessage({ id: "login.forgotPasswordButton" })}
						</Button>
						<div className={"buttonWrapper" + (loginSuccess ? " success" : "")}>
							<Button
								color="primary"
								variant="raised"
								className="btn"
								size="small"
								type="submit"
								disabled={loginButtonProgress !== undefined}
							>
								{formatMessage({ id: "login.loginButton" })}
							</Button>
							{loginButtonProgress}
						</div>
					</CardActions>
				</Card>
			</form>
		);
	}
}
export default injectIntl(withApollo(Login));
