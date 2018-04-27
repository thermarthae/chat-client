import { gql } from "apollo-boost";

export const setLoginStatus = gql`
	mutation ($isLoggedIn: Boolean!, $_id: String!, $name: String!, $email: String!, $isAdmin: Boolean!){
		logIn(isLoggedIn: $isLoggedIn, _id: $_id, name: $name, email: $email, isAdmin: $isAdmin) @client
	}
`;

export const logOut = gql`
	mutation {
		logOut @client
	}
`;
