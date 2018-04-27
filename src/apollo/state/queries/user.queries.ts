import { gql } from "apollo-boost";

export const getLoginStatus = gql`
	query {
		isLoggedIn @client
	}
`;
