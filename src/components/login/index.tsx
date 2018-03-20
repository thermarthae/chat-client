import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

//import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Card, { CardActions, CardContent } from "material-ui/Card";
import "../../style/login.component.scss";

import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";
import IconButton from "material-ui/IconButton";
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";

interface ILoginProps extends InjectedIntlProps { }

interface ILoginStates {
	username: string;
	password: string;
	loginError: boolean;
	passwordError: boolean;
	showPassword: boolean;
}

class Login extends React.PureComponent<ILoginProps, ILoginStates> {
	public state = {
		username: "",
		password: "",
		loginError: false,
		passwordError: false,
		showPassword: false,
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

	public render() {
		return (
			<div id="login">
				<Card className="container">
					<CardContent>
						<div className="title">
							{this.props.intl.formatMessage({
								id: "login.title",
								defaultMessage: "Login"
							})}
						</div>
						<div className="subtitle">
							{this.props.intl.formatMessage({
								id: "login.subtitle",
								defaultMessage: "Login to continue"
							})}
						</div>
						<form className="form">
							<FormControl
								fullWidth
								error={this.state.loginError}
							>
								<InputLabel>
									{this.props.intl.formatMessage({
										id: "login.email",
										defaultMessage: "Email"
									})}
								</InputLabel>
								<Input
									autoComplete="email"
									type="text"
									value={this.state.username}
									onChange={this.handleUsernameChange}
								/>
								<FormHelperText>
									{this.state.loginError
										? this.props.intl.formatMessage({
											id: "login.incorrentEmail",
											defaultMessage:
												"Incorrent email"
										}) : ""}
								</FormHelperText>
							</FormControl>
							<FormControl
								fullWidth
								error={this.state.loginError}
							>
								<InputLabel>
									{this.props.intl.formatMessage({
										id: "login.password",
										defaultMessage: "Password"
									})}
								</InputLabel>
								<Input
									autoComplete="password"
									type={this.state.showPassword ? "text" : "password"}
									value={this.state.password}
									onChange={this.handlePasswordChange}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												onClick={this.handleShowPassswordClick}
												onMouseDown={e => e.preventDefault()}
											>
												{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
								/>
								<FormHelperText>
									{this.state.passwordError
										? this.props.intl.formatMessage({
											id: "login.incorrentPassword",
											defaultMessage:
												"Incorrent password"
										}) : ""}
								</FormHelperText>
							</FormControl>
						</form>
					</CardContent>
					<CardActions className="buttons">
						<Button
							variant="flat"
							color="primary"
							className="btn"
							size="small"
						>
							{this.props.intl.formatMessage({
								id: "login.forgotPasswordButton",
								defaultMessage: "Forgot password"
							})}
						</Button>
						<Button
							color="primary"
							variant="raised"
							className="btn"
							size="small"
						>
							{this.props.intl.formatMessage({
								id: "login.loginButton",
								defaultMessage: "Login"
							})}
						</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}
export default injectIntl(Login);
{
	/*
<div className="title">Zaloguj się</div>
<div className="subtitle">Zaloguj się aby kontynuować</div>
<div className="form">
	<TextField
		fullWidth
		autoComplete="email"
		helperText=" "
		label="Adres email"
		type="text"
	/>
	<TextField
		fullWidth
		autoComplete="password"
		helperText=" "
		label="Hasło"
		type="password"
	/>
</div>
<div className="buttons">
	<Button variant="flat" color="primary" className="btn" size="small">Zapomniałem hasła</Button>
	<Button color="primary" variant="raised" className="btn" size="small">Zaloguj</Button>
</div>
*/
}
