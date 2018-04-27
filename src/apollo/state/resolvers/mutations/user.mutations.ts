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

export const logOut = (_: undefined, {}: any, { cache }: ApolloClient<any>) => { //TODO
	const data = {
		isLoggedIn: false,
		currentUser: {
			__typename: "User",
			_id: null,
			name: null,
			email: null,
			isAdmin: null
		},
	};

	cache.writeData({ data });
	return null;
};
