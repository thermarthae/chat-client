import { createContext } from 'react';

export interface ILoginStatusContext {
	isLoggedIn: boolean;
	setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginStatusCtx = createContext<ILoginStatusContext>({
	isLoggedIn: false,
	setLoginStatus: () => ({})
});

export default LoginStatusCtx;
