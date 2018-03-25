import ApolloClient from "apollo-boost";

export const logIn = (_: undefined, { isLoggedIn, _id, name, email, isAdmin }: any, { cache }: ApolloClient<any>) => {
	const data = {
		isLoggedIn,
		currentUser: {
			__typename: "User",
			_id,
			name,
			email,
			isAdmin
		},
	};
	cache.writeData({ data });
	return null;
};

export const logOut = (_: undefined, { id, name, isLoggedIn }: any, { cache }: ApolloClient<any>) => {
	return null;
};
