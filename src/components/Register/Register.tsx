import React, { useState, useReducer, Reducer } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';

import { useMutation } from 'react-apollo-hooks';
import { REGISTER, IRegisterRes } from './Register.apollo';
import { isApolloError } from 'apollo-client/errors/ApolloError';

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

import registerStyles from './Register.style';
import { UserErrors } from '@src/constants/UserErrors';


type TFieldReducer = Reducer<typeof initFieldState, {
	type: keyof typeof initFieldState;
	value: string;
}>;
const initFieldState = {
	username: '',
	email: '',
	password: '',
	confirmPassword: ''
};


type TErrReducer = Reducer<typeof initErrState, keyof typeof UserErrors | 'clear'>;
const initErrState = { ...initFieldState, unknown: '' };

const Register = ({ history }: RouteComponentProps) => {
	const classes = registerStyles();
	const [t] = useTranslation();
	const [showPwd, setShowPwd] = useState(false);
	const [waitingForServer, setWaitingForServer] = useState(false);
	const [fields, fieldsDispatch] = useReducer<TFieldReducer>(
		(state, { type, value }) => ({ ...state, [type]: value }),
		initFieldState
	);

	const [err, errDispatch] = useReducer<TErrReducer>((state, code) => {
		const msg = t('error.' + code);
		switch (code) {
			case 'UserExistsError':
				return { ...state, email: msg };
			case 'UsernameIsTooShort':
				return { ...state, username: msg };
			case 'PasswordIsTooShort':
				return { ...state, password: msg };
			case 'PasswordsAreNotEqual':
				return { ...state, password: msg, confirmPassword: msg };
			case 'clear':
				return initErrState;
			case 'UnknownError':
			default:
				return { ...state, unknown: msg };
		}
	}, initErrState);

	const registerMutation = useMutation<IRegisterRes>(REGISTER, { variables: fields, fetchPolicy: 'no-cache' });
	const handleSubmit = async () => {
		errDispatch('clear');

		if (fields.username.length < 3) return errDispatch('UsernameIsTooShort');
		if (fields.password.length < 8) return errDispatch('PasswordIsTooShort');
		if (fields.password !== fields.confirmPassword && !showPwd) return errDispatch('PasswordsAreNotEqual');

		setWaitingForServer(true);

		await registerMutation().catch(error => {
			if (isApolloError(error)) {
				const { code }: { code?: string } = error.graphQLErrors[0].extensions || {};
				errDispatch(code as any);
			}
			else errDispatch('UnknownError');
		});

		setWaitingForServer(false);
		history.push('/login');
	};
	const handleOnChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
		fieldsDispatch({ type: name as any, value });
	};

	const fieldsProps = (name: keyof typeof initFieldState) => ({
		required: true,
		fullWidth: true,
		type: 'text',
		autoComplete: 'off',
		onChange: handleOnChange,
		variant: 'outlined',
		margin: 'normal',
		name,
		value: fields[name],
		error: !!err[name],
		label: t('register.' + name),
		helperText: err[name],
	} as const);

	return (
		<div className={classes.root}>
			<form className={classes.form}>
				<Card className={classes.container} raised>
					<Logo size={3} className={classes.logo} />
					<Typography variant='h5' align='center' gutterBottom children={t('register.title')} />
					<Typography variant='body2' align='center' color='textSecondary' children={t('register.subtitle')} />
					<div className={classes.textFields}>
						<TextField {...fieldsProps('username')} />
						<TextField {...fieldsProps('email')} />
						<TextField
							{...fieldsProps('password')}
							type={showPwd ? 'text' : 'password'}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={() => setShowPwd(!showPwd)}>
											{showPwd ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
						<TextField
							{...fieldsProps('confirmPassword')}
							type={'password'}
							disabled={showPwd}
						/>
						<Typography variant='body2' color='textSecondary' children={t('register.agreementTerms')} />
						{err.unknown && <Typography variant='body2' color='error' children={err.unknown} />}
					</div>
					<div className={classes.actions}>
						<Button
							color='primary'
							variant='text'
							children={t('register.loginRedirectBtn')}
							onClick={() => history.push('/login')}
						/>
						<div className={classes.btnWrapper}>
							<Button
								color='primary'
								variant='contained'
								children={t('register.signBtn')}
								onClick={handleSubmit}
								disabled={waitingForServer === true}
							/>
							{waitingForServer && <CircularProgress size='1.5em' className={classes.progress} />}
						</div>
					</div>
				</Card>
			</form>
		</div>
	);
};

export default Register;
