import ApolloClient from "apollo-boost";

export const setLoginStatus = (_: undefined, { loginStatus }: any, { cache }: ApolloClient<any>) => {
	const data = {
		app: {
			__typename: "App",
			isLoggedIn: loginStatus,
		}
	};
	cache.writeData({ data });
	return null;
};
