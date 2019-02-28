import ApolloClient from 'apollo-client';

const App = {
	defaults: {
		app: {
			__typename: 'App',
			isLoggedIn: false,
		}
	},
	resolvers: {
		Mutation: {
			setLoginStatus: (_: undefined, { loginStatus }: any, { cache }: ApolloClient<any>) => {
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
