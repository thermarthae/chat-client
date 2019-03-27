import { IClientState } from '.';

interface IApp {
	__typename: 'App';
	isLoggedIn: boolean;
}

const App: IClientState<'app', IApp> = {
	defaults: {
		app: {
			__typename: 'App',
			isLoggedIn: false,
		}
	},
	resolvers: {
		Mutation: {
			setLoginStatus: ({ }, { loginStatus }: { loginStatus: boolean }, { cache }) => {
				const data = {
					app: {
						__typename: 'App',
						isLoggedIn: loginStatus,
					}
				};
				cache.writeData({ data });
				return data.app;
			}
		}
	}
};
export default App;
